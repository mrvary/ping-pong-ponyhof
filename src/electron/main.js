/**
 * @author Marco Goebel
 */

const { app, ipcMain, shell } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

// electron reload
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

// configuration
const config = require("./config");

// xml import / export
const xmlImporter = require("../modules/import/xml-importer");
const xmlExporter = require("../modules/export/xml-exporter");

// competition model
const {
  COMPETITION_STATE,
  setCompetitionCurrentRound,
  setCompetitionRoundMatches,
  setCompetitionState
} = require("../shared/models/competition");

const { createStateResponseData } = require("./helper/mainHelper");

// player model
const {
  updatePlayersAfterDrawing,
  updateWinner
} = require("../matchmaker/player");

// matchmaker
const matchmaker = require("../matchmaker/drawing");

// ranking
const { createCurrentRanking } = require("../matchmaker/ranking");

// persistence
const dbManager = require("../modules/persistance/database-manager");
const fileManager = require("../modules/persistance/file-manager");

// communication
const server = require("../modules/server/server");
const serverMessages = require("../modules/server/serverMessages");
const ipcMessages = require("../shared/ipc-messages");

// client
const { isMatchFinished } = require("../client/src/shared/lib");

// windows dialog
const uiActions = require("./dialog/dialog");
const menuBuilder = require("./menu/menu-builder");
const MENU_ACTIONS = require("./menu/menu-actions");
const createWindow = require("./window");

// electron windows
let mainWindow = null;
let statisticWindow = null;

// application state variables
let currentCompetition = null;
let matchesWithPlayers = null;

app.on("ready", main);

app.on("before-quit", () => {
  // save current competition state
  saveCompetitionState();

  // notify clients and after that shutdown server
  server.sendAppDisconnectBroadcast();
  server.shutdownServer();
});

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (event, hasVisibleWindows) => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!hasVisibleWindows) {
    createWindow();
  }
});

/**
 * Initialize application modules and event listener
 */
function main() {
  // init meta storage
  dbManager.initMetaRepository(config.USE_IN_MEMORY_STORAGE);

  // init web server and client communication
  server.initHTTPServer(config.SERVER_PORT);
  registerServerEvents();

  // init ipc-main event listener
  registerIPCMainEvents();

  // init main window
  mainWindow = createWindow();

  installExtensions();

  // init application menu
  menuBuilder.registerAction(MENU_ACTIONS.OPEN_CLIENT, openClient);
  menuBuilder.registerAction(MENU_ACTIONS.EXPORT_XML, exportXML);
  menuBuilder.registerAction(MENU_ACTIONS.SHOW_REPO, openRepository);

  menuBuilder.buildMenu(app, mainWindow);
}

/**
 * Installs the development tools extensions
 */
function installExtensions() {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require("electron-devtools-installer");

    // Install extensions
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));
  }
}

/**
 * Registers event listeners for client requests
 */
function registerServerEvents() {
  // register event for client login
  // send current app state to client
  server.ServerMainIOConnection.on(
    serverMessages.STATE_REQUEST,
    handleSendAppStateToClient
  );

  // register event for client login and
  // set connected device for the current match
  server.ServerMainIOConnection.on(
    serverMessages.UPDATE_CONNECTION_STATUS,
    handleUpdateConnectionStatus
  );

  // register event for client send sets
  server.ServerMainIOConnection.on(
    serverMessages.UPDATE_SETS_REQUEST,
    handleUpdateSetsFromClient
  );
}

/**
 * register ipc main event listener
 */
function registerIPCMainEvents() {
  // register events for main page
  ipcMain.on(ipcMessages.GET_COMPETITIONS_REQUEST, handleGetCompetitions);
  ipcMain.on(ipcMessages.DELETE_COMPETITION_REQUEST, handleDeleteCompetition);

  // register events for the xml import
  ipcMain.on(ipcMessages.OPEN_FILE_DIALOG_REQUEST, handleOpenFileDialog);
  ipcMain.on(
    ipcMessages.GET_COMPETITION_PREVIEW_REQUEST,
    handleGetCompetitionPreview
  );
  ipcMain.on(ipcMessages.IMPORT_XML_FILE_REQUEST, handleXMLImport);

  // register events for the competition page
  ipcMain.on(
    ipcMessages.GET_COMPETITION_MATCHES_REQUEST,
    handleInitCompetition
  );
  ipcMain.on(ipcMessages.UPDATE_SETS, handleUpdateSetsFromApp);

  // register events for the competition page actions
  ipcMain.on(ipcMessages.START_COMPETITION, handleStartCompetition);
  ipcMain.on(ipcMessages.CANCEL_COMPETITION, handleCancelCompetition);
  ipcMain.on(ipcMessages.COMPLETE_COMPETITION, handleCompetitionCompleted);
  ipcMain.on(ipcMessages.START_ROUND, handleStartRound);
  ipcMain.on(ipcMessages.NEXT_ROUND, handleNextRound);
  ipcMain.on(ipcMessages.CANCEL_ROUND, handleCancelRound);

  // register events for the statistic view
  ipcMain.on(ipcMessages.OPEN_NEW_WINDOW, handleOpenStatisticWindow);
  ipcMain.on(ipcMessages.GET_RANKING_REQUEST, handleUpdateRanking);

  // register event for the ip address popup
  ipcMain.on(ipcMessages.GET_IP_ADDRESS_REQUEST, handleGetIPAddress);
}

/**
 * Opens an web link outside of the electron application
 * @param url
 */
function openExternalLink(url) {
  shell
    .openExternal(url)
    .then(() => {
      console.log(`The external web site is opened: ${url}`);
    })
    .catch(err => {
      console.log(err.message);
    });
}

// -------------------------------------
// server --> ipc-main
// -------------------------------------

function handleSendAppStateToClient(args) {
  console.log("Server-->IPC-Main:", serverMessages.STATE_REQUEST);
  const { tableNumber } = args;

  const responseData = createStateResponseData(
    tableNumber,
    currentCompetition,
    matchesWithPlayers
  );

  server.ServerMainIOConnection.emit(
    serverMessages.STATE_RESPONSE,
    responseData
  );
}

function handleUpdateConnectionStatus(args) {
  console.log("Server-->IPC-Main:", serverMessages.UPDATE_CONNECTION_STATUS);
  const { connectedDevice, tableNumber } = args;

  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  // update match with players by table number
  matchesWithPlayers = matchesWithPlayers.map(matchWithPlayers => {
    if (matchWithPlayers.tableNumber === tableNumber) {
      return { ...matchWithPlayers, connectedDevice };
    }

    return matchWithPlayers;
  });

  // create result data
  const resultData = {
    competition: currentCompetition,
    matchesWithPlayers: matchesWithPlayers
  };

  mainWindow.webContents.send(ipcMessages.UPDATE_MATCHES, resultData);
}

function handleUpdateSetsFromClient(args) {
  console.log("Server-->IPC-Main:", serverMessages.UPDATE_SETS_REQUEST);
  const { tableNumber, sets, finished } = args;

  updateSets(tableNumber, sets);

  // notify app about the update
  const resultData = {
    competition: currentCompetition,
    matchesWithPlayers: matchesWithPlayers
  };

  mainWindow.webContents.send(ipcMessages.UPDATE_MATCHES, resultData);

  // notify client about the update
  const responseData = finished
    ? { message: "finished" }
    : { message: "success" };

  server.ServerMainIOConnection.emit(
    serverMessages.UPDATE_SETS_RESPONSE,
    responseData
  );
}

// -------------------------------------
// ipc-renderer --> ipc-main
// -------------------------------------

function handleGetCompetitions(event) {
  console.log(
    "ipc-renderer --> ipc-main:",
    ipcMessages.GET_COMPETITIONS_REQUEST
  );

  // Get all competitions from database
  const metaRepository = dbManager.getMetaRepository();
  const competitions = metaRepository.getAllCompetitions();

  // create result data
  const resultData = { competitions };

  // send competitions to renderer process
  event.sender.send(ipcMessages.GET_COMPETITIONS_RESPONSE, resultData);
  console.log(
    "ipc-main --> ipc-renderer:",
    ipcMessages.GET_COMPETITIONS_RESPONSE
  );
}

function handleDeleteCompetition(event, args) {
  console.log(
    "ipc-renderer --> ipc-main:",
    ipcMessages.DELETE_COMPETITION_REQUEST
  );
  const { competitionId } = args;

  // check if the parameter is undefined
  if (!competitionId) {
    console.log("Parameter competitionId is undefined");
    return;
  }

  // check if the current competition is the deleted competition
  if (currentCompetition && currentCompetition.id === competitionId) {
    currentCompetition = null;
    matchesWithPlayers = null;
  }

  // delete competition from database
  dbManager.deleteCompetitionStorage(competitionId);

  // notify renderer that the competition is deleted
  event.sender.send(ipcMessages.DELETE_COMPETITION_RESPONSE);
  console.log(
    "ipc-main --> ipc-renderer:",
    ipcMessages.DELETE_COMPETITION_RESPONSE
  );
}

function handleOpenFileDialog(event) {
  console.log(
    "ipc-renderer --> ipc-main:",
    ipcMessages.OPEN_FILE_DIALOG_REQUEST
  );

  uiActions
    .openXMLFile()
    .then(filePath => {
      let message = filePath ? "success" : "cancel";

      xmlImporter.setFilePath(filePath);
      console.log("Selected XML File:", filePath);

      const resultData = { message };

      event.sender.send(ipcMessages.OPEN_FILE_DIALOG_RESPONSE, resultData);
      console.log(
        "ipc-main --> ipc-renderer:",
        ipcMessages.OPEN_FILE_DIALOG_RESPONSE
      );
    })
    .catch(err => {
      console.log(err.message);
    });
}

// load xml file from disk and send preview data to ipc renderer
function handleGetCompetitionPreview(event) {
  console.log(
    "ipc-renderer --> ipc-main",
    ipcMessages.GET_COMPETITION_PREVIEW_REQUEST
  );

  // init xml importer with competition data
  const returnData = xmlImporter.createCompetitionPreview();

  // send data back to ipc-renderer { competition, players }
  event.sender.send(ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE, returnData);
  console.log(
    "ipc-main --> ipc-renderer:",
    ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE
  );
}

function handleXMLImport(event, args) {
  console.log(
    "ipc-renderer --> ipc-main:",
    ipcMessages.IMPORT_XML_FILE_REQUEST
  );

  let returnData;

  try {
    if (currentCompetition) {
      const { state } = currentCompetition;

      if (
        state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
        state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
      ) {
        const message =
          "Ein Tunier ist im Moment aktiv. Bitte erst das aktive Turnier pausieren";
        console.log(message);
        throw new Error(message);
      }
    }

    // import data into databases
    xmlImporter.importXMLIntoDatabases(dbManager);

    // create response message with success message
    returnData = {
      message: "success"
    };
  } catch (err) {
    console.log(err.message);

    // create result data with the error message
    returnData = {
      message: err.message
    };
  } finally {
    // notify react app about the import status
    event.sender.send(ipcMessages.IMPORT_XML_FILE_RESPONSE, returnData);
    console.log(
      "ipc-main --> ipc-renderer:",
      ipcMessages.IMPORT_XML_FILE_RESPONSE
    );
  }
}

function handleInitCompetition(event, args) {
  console.log(
    "ipc-renderer --> ipc-main:",
    ipcMessages.GET_COMPETITION_MATCHES_REQUEST
  );
  const { competitionId } = args;

  // load competition
  const resultData = initCompetition(competitionId);

  event.sender.send(ipcMessages.UPDATE_MATCHES, resultData);
  console.log("ipc-main --> ipc-renderer:", ipcMessages.UPDATE_MATCHES);
}

function handleUpdateSetsFromApp(event, args) {
  console.log("ipc-main --> ipc-renderer:", ipcMessages.UPDATE_SETS);
  const { tableNumber, sets } = args;

  updateSets(tableNumber, sets);

  const resultData = {
    competition: currentCompetition,
    matchesWithPlayers: matchesWithPlayers
  };

  event.sender.send(ipcMessages.UPDATE_MATCHES, resultData);
}

function handleStartCompetition() {
  console.log("ipc-renderer --> ipc-main:", ipcMessages.START_COMPETITION);

  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  const { state, currentRound } = currentCompetition;

  // update competition state and notify client
  if (state === COMPETITION_STATE.COMP_CREATED) {
    const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_READY;
    currentCompetition = updateCompetitionState(currentCompetition, newState);
  } else if (state === COMPETITION_STATE.COMP_READY_ROUND_READY) {
    const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_READY;
    currentCompetition = updateCompetitionState(currentCompetition, newState);

    if (currentRound === 1) {
      server.sendNextRoundBroadcast({
        matchesWithPlayers: matchesWithPlayers
      });
    }
  } else if (state === COMPETITION_STATE.COMP_READY_ROUND_ACTIVE) {
    const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE;
    currentCompetition = updateCompetitionState(currentCompetition, newState);
    server.sendStartRoundBroadcast({
      matchesWithPlayers: matchesWithPlayers
    });
  } else {
    console.log("wrong state", state);
  }
}

function handleCancelCompetition() {
  console.log("ipc-renderer --> ipc-main:", ipcMessages.CANCEL_COMPETITION);

  if (!currentCompetition) {
    console.log("competition is undefined");
  }

  const { state } = currentCompetition;

  // update the competition state
  let newState;
  if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
    newState = COMPETITION_STATE.COMP_READY_ROUND_READY;
  } else if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
    newState = COMPETITION_STATE.COMP_READY_ROUND_ACTIVE;
  } else {
    console.log("wrong state", state);
    return;
  }

  // update competition state in database
  currentCompetition = updateCompetitionState(currentCompetition, newState);

  server.sendCancelCompetitionBroadcast();
}

function handleCompetitionCompleted(event) {
  console.log("ipc-renderer --> ipc-main:", ipcMessages.COMPLETE_COMPETITION);

  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  const { state, currentRound } = currentCompetition;

  // check if it's a valid state transition (double check if all games are finished?)
  if (state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
    console.log("wrong state", state);
    return;
  }

  // check if the current round is the last round
  if (currentRound !== 6) {
    return;
  }

  let { matches, players } = splitMatchesWithPlayer(matchesWithPlayers);

  // check if matches of current round have finished
  const matchesAreFinished = currentMatchesAreFinished(matches);
  if (!matchesAreFinished) {
    return;
  }

  // update players data after matches are finished
  players = updateWinner(players, matches);

  const playerRepository = dbManager.getPlayerRepository();
  playerRepository.updatePlayers(players);

  // set competition state to finished
  const newState = COMPETITION_STATE.COMP_COMPLETED;
  currentCompetition = updateCompetitionState(currentCompetition, newState);

  // update ranking with winners of last round
  handleUpdateRanking();

  const resultData = {
    competition: currentCompetition,
    matchesWithPlayers: matchesWithPlayers
  };

  event.sender.send(ipcMessages.UPDATE_MATCHES, resultData);
}

function handleStartRound() {
  console.log("ipc-renderer --> ipc-main:", ipcMessages.START_ROUND);

  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  const { state } = currentCompetition;

  if (state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
    console.log("wrong state", state);
    return;
  }

  const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE;
  currentCompetition = updateCompetitionState(currentCompetition, newState);

  server.sendStartRoundBroadcast();
}

function handleNextRound(event) {
  console.log("ipc-renderer --> ipc-main:", ipcMessages.NEXT_ROUND);

  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  // check if it's a valid state transition (double check if all games are finished?)
  const { state } = currentCompetition;
  if (state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
    console.log("wrong state", state);
    return;
  }

  let { matches, players } = splitMatchesWithPlayer(matchesWithPlayers);

  // check if matches of current round have finished
  const matchesAreFinished = currentMatchesAreFinished(matches);
  if (!matchesAreFinished) {
    console.log("matches are not finished, yet");
    return;
  }

  // update players data after matches are finished
  players = updateWinner(players, matches);

  const playerRepository = dbManager.getPlayerRepository();
  playerRepository.updatePlayers(players);

  // use matchmaker to draw next round
  const drawing = createMatchesWithMatchmaker(players, matches);
  players = drawing.players;
  matches = drawing.matches;

  // set round counter of competition to next round
  let { currentRound } = currentCompetition;
  let nextRound = currentRound + 1;
  currentRound = nextRound;

  // update current round
  currentCompetition = setCompetitionCurrentRound(
    currentCompetition,
    nextRound
  );

  // update rounds of competition
  currentCompetition = setCompetitionRoundMatches(
    currentCompetition,
    currentRound,
    matches
  );

  // update competition state
  const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_READY;
  currentCompetition = setCompetitionState(currentCompetition, newState);

  // update competition in storage
  const metaRepository = dbManager.getMetaRepository();
  metaRepository.updateCompetition(currentCompetition);

  // init matches with players
  matchesWithPlayers = mapMatchesWithPlayers(matches, players);
  console.log("competition and players and matches are ready for next round");

  handleUpdateRanking();

  const resultData = {
    competition: currentCompetition,
    matchesWithPlayers: matchesWithPlayers
  };
  event.sender.send(ipcMessages.UPDATE_MATCHES, resultData);

  server.sendNextRoundBroadcast({
    matchesWithPlayers: matchesWithPlayers
  });
}

function handleCancelRound(event) {
  console.log("ipc-renderer --> ipc-main:", ipcMessages.CANCEL_ROUND);

  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  const { state, currentRound } = currentCompetition;

  // check if it's a valid state transition (double check if all games are finished?)
  if (
    state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY ||
    state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
  ) {
    if (currentRound === 1) {
      console.log("The first round can not be deleted");
      return;
    }

    // update competition state
    const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE;
    currentCompetition = setCompetitionState(currentCompetition, newState);

    // send cancel round to clients
    server.sendCancelRoundBroadcast();

    currentCompetition = deleteCurrentRound(
      currentCompetition,
      matchesWithPlayers
    );
    console.log("Delete round from database");

    const playerRepository = dbManager.getPlayerRepository();
    const players = playerRepository.getAll();

    const matches = getMatchesByRound(currentCompetition);

    matchesWithPlayers = mapMatchesWithPlayers(matches, players);

    handleUpdateRanking();

    const resultData = {
      competition: currentCompetition,
      matchesWithPlayers: matchesWithPlayers
    };
    event.sender.send(ipcMessages.UPDATE_MATCHES, resultData);
  } else {
    console.log("wrong state", state);
  }
}

function handleOpenStatisticWindow(event, args) {
  const { route } = args;

  const isStatisticView = route.includes("statisticTable");
  if (!isStatisticView) {
    console.log("wrong route", route);
    return;
  }

  // create statistic window
  statisticWindow = createWindow(route);
  statisticWindow.once("close", () => {
    statisticWindow = null;
  });
}

function handleUpdateRanking() {
  if (!statisticWindow) {
    return;
  }

  // get current players and matches
  const playerRepository = dbManager.getPlayerRepository();
  const players = playerRepository.getAll();

  const matchRepository = dbManager.getMatchRepository();
  const matches = matchRepository.getAll();

  const rankings = createCurrentRanking(players, matches);
  console.log("update ranking table");

  statisticWindow.webContents.send(ipcMessages.UPDATE_RANKING, {
    competition: currentCompetition,
    rankings
  });
}

function handleGetIPAddress(event) {
  console.log("ipc-renderer --> ipc-main:", ipcMessages.GET_IP_ADDRESS_REQUEST);

  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
  event.sender.send(ipcMessages.GET_IP_ADDRESS_RESPONSE, { ipAddress: url });
}

// -------------------------------------
// menu event handler
// -------------------------------------

const openClient = () => openExternalLink(config.SERVER_URL);

const openRepository = () => openExternalLink(config.GITHUB_LINK);

const exportXML = () => {
  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  // create default file path
  const fileName = "exportTournament.xml";
  const defaultFilePath = fileManager.getDefaultExportFilePath(fileName);

  uiActions.showSaveDialog(defaultFilePath).then(result => {
    const filePath = result.filePath;

    const matchRepository = dbManager.getMatchRepository();
    const matches = matchRepository.getAll();

    const jsonObject = dbManager.getImportedJSONObject();

    xmlExporter.exportXML(filePath, matches, jsonObject);
  });
};

// -------------------------------------
// helper functions
// -------------------------------------

function updateSets(tableNumber, sets) {
  if (!currentCompetition) {
    console.log("competition is undefined");
    return;
  }

  const { state } = currentCompetition;

  // check if competition has completed
  if (state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
    console.log("wrong state", state);
    return;
  }

  // update sets by tableNumber
  matchesWithPlayers = matchesWithPlayers.map(matchWithPlayers => {
    if (matchWithPlayers.tableNumber === tableNumber) {
      const { match } = matchWithPlayers;
      matchWithPlayers.match = { ...match, sets };

      updateMatch(matchWithPlayers);
    }

    return matchWithPlayers;
  });

  handleUpdateRanking();

  return {
    competition: currentCompetition,
    matchesWithPlayers: matchesWithPlayers
  };
}

function initCompetition(competitionId) {
  // check if the parameter is undefined
  if (!competitionId) {
    console.log("Parameter competitionId is undefined");
    return;
  }

  if (currentCompetition && currentCompetition.id === competitionId) {
    return {
      competition: currentCompetition,
      matchesWithPlayers: matchesWithPlayers
    };
  }

  // get competition from meta repository
  const metaRepository = dbManager.getMetaRepository();
  let competition = metaRepository.getCompetition(competitionId);
  console.log(`Get competition ${competitionId} from competitions`);

  // init competition database
  dbManager.initCompetitionStorage(competitionId, config.USE_IN_MEMORY_STORAGE);

  // get players from competition storage
  const playerRepository = dbManager.getPlayerRepository();
  let players = playerRepository.getAll();
  console.log("Get players from competition database");

  // init matches ...
  let matches;
  if (competition.state === COMPETITION_STATE.COMP_CREATED) {
    // ... with matchmakers first round
    const drawing = createMatchesWithMatchmaker(players, []);
    players = drawing.players;
    matches = drawing.matches;

    // create new round with current match ids
    const { currentRound } = competition;
    competition = setCompetitionRoundMatches(
      competition,
      currentRound,
      matches
    );

    // update competition state
    const newState = COMPETITION_STATE.COMP_READY_ROUND_READY;
    competition = setCompetitionState(competition, newState);

    // update competition in database
    metaRepository.updateCompetition(competition);
  } else {
    // ... from competition storage
    matches = getMatchesByRound(competition);
  }

  // init current competition
  currentCompetition = competition;

  // init matches with players
  matchesWithPlayers = mapMatchesWithPlayers(matches, players);
  console.log("competition and players and matches are selected");

  return {
    competition: currentCompetition,
    matchesWithPlayers: matchesWithPlayers
  };
}

function currentMatchesAreFinished(matches) {
  let matchesAreFinished = true;

  for (let i = 0; i < matches.length; i++) {
    if (!isMatchFinished(matches[i])) {
      matchesAreFinished = false;
      break;
    }
  }

  return matchesAreFinished;
}

// use matchmaker to draw the next round and update players
function createMatchesWithMatchmaker(players, currentMatches) {
  const lastMatchId =
    currentMatches.length > 0
      ? currentMatches[currentMatches.length - 1].id + 1
      : 0;

  console.log("LAST_MATCH_ID:", lastMatchId);

  const matches = matchmaker.drawRound(players, lastMatchId);
  players = updatePlayersAfterDrawing(players, matches);
  console.log("Get matches from matchmaker");

  const playerRepository = dbManager.getPlayerRepository();
  playerRepository.updatePlayers(players);

  const matchRepository = dbManager.getMatchRepository();
  matchRepository.createMatches(matches);
  console.log("Save matches and player in competition storage");

  return { matches, players };
}

function updateCompetitionState(competition, newState) {
  console.log("Change competition state:", competition.state, "-->", newState);
  competition = setCompetitionState(competition, newState);

  const metaRepository = dbManager.getMetaRepository();
  metaRepository.updateCompetition(competition);

  return competition;
}

function updateMatch(matchWithPlayers) {
  const match = getMatchFromMatchWithPlayer(matchWithPlayers);

  const matchRepository = dbManager.getMatchRepository();
  matchRepository.updateMatch(match);
}

function mapMatchesWithPlayers(matches, players) {
  let tableNumber = 1;
  let matchesWithPlayers = [];

  matches.forEach(match => {
    // get client connection state from server
    const uuid = server.getConnectedDeviceByTableNumber(tableNumber);

    // find players of match
    const player1 = players.find(player => player.id === match.player1);
    const player2 = players.find(player => player.id === match.player2);

    // create a copy of the match object and the player objects
    // and map players and match together
    const copyMatch = { ...match };
    copyMatch.player1 = { ...player1 };
    copyMatch.player2 = { ...player2 };

    // create new result object
    const matchWithPlayers = {
      tableNumber: tableNumber,
      connectedDevice: uuid,
      match: copyMatch
    };

    matchesWithPlayers.push(matchWithPlayers);
    tableNumber++;
  });

  return matchesWithPlayers;
}

function getMatchFromMatchWithPlayer(matchWithPlayers) {
  const { match } = matchWithPlayers;

  const copyMatch = { ...match };
  copyMatch.player1 = copyMatch.player1.id;
  copyMatch.player2 = copyMatch.player2.id;

  return copyMatch;
}

function splitMatchesWithPlayer(matchesWithPlayers) {
  let matches = [];
  let players = [];

  matchesWithPlayers.forEach(matchWithPlayers => {
    const player1 = matchWithPlayers.match.player1;
    const player2 = matchWithPlayers.match.player2;

    players.push(player1);
    players.push(player2);

    const match = getMatchFromMatchWithPlayer(matchWithPlayers);
    matches.push(match);
  });

  return { matches, players };
}

function deleteCurrentRound(competition, matchesWithPlayers) {
  const { currentRound, rounds } = competition;
  const { matchIds } = rounds.find(round => round.roundNumber === currentRound);

  // delete round in competition
  const roundsWithoutCurrent = rounds.filter(
    round => round.roundNumber !== currentRound
  );

  const updatedCompetition = {
    ...competition,
    rounds: roundsWithoutCurrent,
    currentRound: currentRound - 1
  };

  const metaRepository = dbManager.getMetaRepository();
  metaRepository.updateCompetition(updatedCompetition);

  // delete matches in database
  const matchRepository = dbManager.getMatchRepository();
  matchRepository.deleteMatches(matchIds);

  // update players after cancel round
  const { players } = splitMatchesWithPlayer(matchesWithPlayers);

  players.forEach(player => {
    // remove last matchId
    player.matchIds.pop();
    // remove last opponentId
    player.opponentIds.pop();
  });

  const playerRepository = dbManager.getPlayerRepository();
  playerRepository.updatePlayers(players);

  return updatedCompetition;
}

function getMatchesByRound(competition) {
  const { currentRound, rounds } = competition;
  const { matchIds } = rounds.find(round => round.roundNumber === currentRound);

  const matchRepository = dbManager.getMatchRepository();
  const matches = matchRepository.getMatchesByIds(matchIds);
  console.log("Get matches from competition database");

  return matches;
}

function saveCompetitionState() {
  if (!currentCompetition) {
    console.log("competition is undefined");
  }

  const { state } = currentCompetition;

  if (
    state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY ||
    state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
  ) {
    // Set current active competition to ready state
    const newState =
      state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
        ? COMPETITION_STATE.COMP_READY_ROUND_READY
        : COMPETITION_STATE.COMP_READY_ROUND_ACTIVE;
    currentCompetition = updateCompetitionState(currentCompetition, newState);

    // Save current app state into storages
    const { players, matches } = splitMatchesWithPlayer(matchesWithPlayers);

    const playerRepository = dbManager.getPlayerRepository();
    playerRepository.updatePlayers(players);

    const matchRepository = dbManager.getMatchRepository();
    matchRepository.updateMatches(matches);
  }
}
