/**
 * @author Marco Goebel
 */

const { app, ipcMain } = require("electron");
const path = require("path");

// electron reload
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

// configuration
const config = require("./config");

// xml import
const xmlImporter = require("../modules/import/xml-importer");

// competition model
const {
  COMPETITION_STATE,
  setCompetitionRoundMatches,
  setCompetitionState
} = require("../shared/models/competition");

const {
  createStateResponseData,
  createUpdateSetsResponseData
} = require("./helper/mainHelper");

// player model
const {
  updatePlayersAfterDrawing,
  updateWinner
} = require("../matchmaker/player");

// matchmaker
const matchmaker = require("../matchmaker/drawing");
const { createCurrentRanking } = require("../matchmaker/ranking");

// persistence
const fileManager = require("../modules/persistance/file-manager");
const metaRepository = require("../modules/persistance/repositories/meta-repository");
const competitionStorage = require("../modules/persistance/lowdb/competition-storage");

// communication
const server = require("../modules/server/server");
const serverMessages = require("../modules/server/serverMessages");
const ipcMessages = require("../shared/ipc-messages");

// client
const { isMatchFinished } = require("../client/src/shared/lib");

// windows actions
const uiActions = require("./actions/uiActions");
const createMenu = require("./menu/main-menu");
const createWindow = require("./window");

// electron windows
let mainWindow = null;
let statisticWindow = null;

// application state variables
let selectedCompetition = null;

// init communication events
registerIPCMainEvents();
initHTTPServer();

app.on("ready", () => {
  initDevTools();
  initMetaRepository();

  mainWindow = createWindow();
  createMenu();
});

app.on("before-quit", () => {
  // TODO: Save current app state into database
  // TODO: Send disconnect to clients

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
 *  init react dev tools for electron
 *  @author Felix Breitenbach
 */
function initDevTools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require("electron-devtools-installer");

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
}

function initHTTPServer() {
  server.initHTTPServer(config.SERVER_PORT);

  server.ServerMainIOConnection.on(
    serverMessages.UPDATE_CONNECTION_STATUS,
    args => {
      console.log(
        "Server-->IPC-Main:",
        serverMessages.UPDATE_CONNECTION_STATUS
      );
      const { connectedDevice, tableNumber } = args;

      if (!selectedCompetition) {
        return;
      }

      selectedCompetition.matchesWithPlayers = selectedCompetition.matchesWithPlayers.map(
        matchWithPlayers => {
          if (matchWithPlayers.tableNumber === tableNumber) {
            return { ...matchWithPlayers, connectedDevice };
          }

          return matchWithPlayers;
        }
      );

      mainWindow.webContents.send(
        ipcMessages.UPDATE_MATCHES,
        selectedCompetition
      );
    }
  );

  server.ServerMainIOConnection.on(serverMessages.STATE_REQUEST, args => {
    console.log("Server-->IPC-Main:", serverMessages.STATE_REQUEST);
    console.log(args);
    const { tableNumber } = args;

    const responseData = createStateResponseData({
      selectedCompetition,
      tableNumber
    });

    server.ServerMainIOConnection.emit(
      serverMessages.STATE_RESPONSE,
      responseData
    );
  });

  server.ServerMainIOConnection.on(serverMessages.UPDATE_SETS_REQUEST, args => {
    console.log("Server-->IPC-Main:", serverMessages.UPDATE_SETS_REQUEST);
    console.log(args);
    const { tableNumber, sets, finished } = args;

    updateSetsByTableNumber(tableNumber, sets);
    const responseData = finished
      ? { message: "finished" }
      : { message: "success" };

    mainWindow.webContents.send(
      ipcMessages.UPDATE_MATCHES,
      selectedCompetition
    );

    server.ServerMainIOConnection.emit(
      serverMessages.UPDATE_SETS_RESPONSE,
      responseData
    );
  });
}

function initMetaRepository() {
  const filePath = fileManager.getMetaStorageDatabasePath();
  metaRepository.init(filePath, config.USE_IN_MEMORY_STORAGE);
}

function registerIPCMainEvents() {
  ipcMain.on(ipcMessages.GET_COMPETITIONS_REQUEST, event => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.GET_COMPETITIONS_REQUEST
    );

    // send competitions to renderer process
    event.sender.send(ipcMessages.GET_COMPETITIONS_RESPONSE, {
      competitions: metaRepository.getAllCompetitions()
    });
    console.log(
      "ipc-main --> ipc-renderer:",
      ipcMessages.GET_COMPETITIONS_RESPONSE
    );
  });

  ipcMain.on(ipcMessages.DELETE_COMPETITION_REQUEST, (event, data) => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.DELETE_COMPETITION_REQUEST
    );
    const { competitionId } = data;

    // Delete the competition file
    fileManager.deleteTournamentJSONFile(competitionId);

    // Delete competition from meta file
    metaRepository.deleteCompetition(competitionId);

    event.sender.send(ipcMessages.DELETE_COMPETITION_RESPONSE);
    console.log(
      "ipc-main --> ipc-renderer:",
      ipcMessages.DELETE_COMPETITION_RESPONSE
    );
  });

  ipcMain.on(ipcMessages.CANCEL_COMPETITION, event => {
    server.sendCancelCompetitionBroadcast();
  });

  ipcMain.on(ipcMessages.OPEN_FILE_DIALOG_REQUEST, event => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.OPEN_FILE_DIALOG_REQUEST
    );
    uiActions.openXMLFile().then(filePath => {
      let message = filePath ? "success" : "cancel";

      xmlImporter.setFilePath(filePath);
      console.log("Selected XML File:", filePath);

      event.sender.send(ipcMessages.OPEN_FILE_DIALOG_RESPONSE, { message });
      console.log(
        "ipc-main --> ipc-renderer:",
        ipcMessages.OPEN_FILE_DIALOG_RESPONSE
      );
    });
  });

  ipcMain.on(ipcMessages.GET_COMPETITION_PREVIEW_REQUEST, event => {
    console.log(
      "ipc-renderer --> ipc-main",
      ipcMessages.GET_COMPETITION_PREVIEW_REQUEST
    );

    const returnData = xmlImporter.createCompetitionPreview();
    console.log(`competition and players are selected`);

    // send data back to ipc-renderer { competition, players }
    event.sender.send(ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE, returnData);
    console.log(
      "ipc-main --> ipc-renderer:",
      ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE
    );
  });

  ipcMain.on(ipcMessages.IMPORT_XML_FILE_REQUEST, (event, args) => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.IMPORT_XML_FILE_REQUEST
    );
    const { competitionId } = args;

    let returnData;
    try {
      if (selectedCompetition) {
        const { competition } = selectedCompetition;

        if (
          competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
          competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
        ) {
          const message =
            "Ein Tunier ist im Moment aktiv. Bitte erst das aktive Turnier pausieren";
          console.log(message);
          throw new Error(message);
        }
      }

      // 1. initialize competition storage
      const filePath = fileManager.getCompetitionFilePath(competitionId);
      competitionStorage.init(filePath, config.USE_IN_MEMORY_STORAGE);

      // 2. import data into databases
      xmlImporter.importXMLIntoDatabases(metaRepository, competitionStorage);

      // 3. create response message with success message
      returnData = {
        competitionId: competitionId,
        message: "success"
      };
    } catch (err) {
      // notify react app that a error has happened
      console.log(err.message);
      returnData = { competitionId: "", message: err.message };
    } finally {
      // notify react app about the import status
      event.sender.send(ipcMessages.IMPORT_XML_FILE_RESPONSE, returnData);
      console.log(
        "ipc-main --> ipc-renderer:",
        ipcMessages.IMPORT_XML_FILE_RESPONSE
      );
    }
  });

  ipcMain.on(ipcMessages.GET_COMPETITION_MATCHES_REQUEST, (event, args) => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.GET_COMPETITION_MATCHES_REQUEST
    );

    const { competitionId } = args;
    console.log(competitionId);

    if (!competitionId) {
      console.log("Parameter competitionId is undefined");
      return;
    }

    let resultData;
    if (
      selectedCompetition &&
      selectedCompetition.competition.id === competitionId
    ) {
      resultData = selectedCompetition;
    } else {
      // load competition
      resultData = initCompetition(competitionId);

      // init competition dependent on state
      selectedCompetition = resultData;
      console.log("Set competition selected");
    }

    event.sender.send(ipcMessages.UPDATE_MATCHES, resultData);
    console.log("ipc-main --> ipc-renderer:", ipcMessages.UPDATE_MATCHES);
  });

  ipcMain.on(ipcMessages.UPDATE_SETS, (event, args) => {
    console.log("ipc-main --> ipc-renderer:", ipcMessages.UPDATE_SETS);
    const { tableNumber, sets } = args;

    // 2. find match by table number
    updateSetsByTableNumber(tableNumber, sets);

    updateRanking();

    // 5. send update match
    event.sender.send(ipcMessages.UPDATE_MATCHES, selectedCompetition);
  });

  ipcMain.on(ipcMessages.OPEN_NEW_WINDOW, (event, args) => {
    const { route } = args;

    const isStatisticView = route.includes("statisticTable");
    if (isStatisticView) {
      statisticWindow = createWindow(route);
    }
  });

  ipcMain.on(ipcMessages.START_COMPETITION, event => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.START_COMPETITION);
    const { competition } = selectedCompetition;

    // update competition state and notify client
    if (competition.state === COMPETITION_STATE.COMP_CREATED) {
      selectedCompetition.competition = updateCompetitionState(
        competition,
        COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
      );
    } else if (competition.state === COMPETITION_STATE.COMP_READY_ROUND_READY) {
      selectedCompetition.competition = updateCompetitionState(
        competition,
        COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
      );

      if (competition.currentRound === 1) {
        server.sendNextRoundBroadcast({
          matchesWithPlayers: selectedCompetition.matchesWithPlayers
        });
      }
    } else if (
      competition.state === COMPETITION_STATE.COMP_READY_ROUND_ACTIVE
    ) {
      selectedCompetition.competition = updateCompetitionState(
        competition,
        COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
      );
      server.sendStartRoundBroadcast({
        matchesWithPlayers: selectedCompetition.matchesWithPlayers
      });
    }
  });

  ipcMain.on(ipcMessages.CANCEL_COMPETITION, event => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.CANCEL_COMPETITION);
    const { competition } = selectedCompetition;

    let newState;
    if (competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
      newState = COMPETITION_STATE.COMP_READY_ROUND_READY;
      //TODO: Passiert hier noch was?
    } else if (
      competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
    ) {
      newState = COMPETITION_STATE.COMP_READY_ROUND_ACTIVE;
      //TODO: Passiert hier noch was?
    } else {
      console.log("no new state");
      return;
    }

    selectedCompetition.competition = updateCompetitionState(
      competition,
      newState
    );
    server.sendCancelCompetitionBroadcast();
  });

  ipcMain.on(ipcMessages.START_ROUND, () => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.START_ROUND);
    const { competition } = selectedCompetition;

    if (competition.state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
      console.log("wrong state", selectedCompetition.state);
      return;
    }

    const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE;
    selectedCompetition.competition = updateCompetitionState(
      competition,
      newState
    );

    server.sendStartRoundBroadcast();
  });

  ipcMain.on(ipcMessages.NEXT_ROUND, event => {
    // check if it's a valid state transition (double check if all games are finished?)
    // fire up matchmaker
    // save things

    let { competition, matchesWithPlayers } = selectedCompetition;

    if (competition.state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
      return;
    }

    competition.currentRound++;

    // use matchmaker to draw next round
    let { matches, players } = splitMatchesWithPlayer(matchesWithPlayers);
    players = updateWinner(players, matches);

    const drawing = createMatchesWithMatchmaker(players, matches);
    players = drawing.players;
    matches = drawing.matches;

    // update competition in database
    let { currentRound } = competition;
    competition = setCompetitionRoundMatches(
      competition,
      currentRound,
      matches
    );
    competition = setCompetitionState(
      competition,
      COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
    );
    metaRepository.updateCompetition(competition);

    /*const matchesWithoutFreeTickets = selectedCompetition.matchesWithPlayers.filter(
      ({ match }) =>
        match.player1.id !== "FreeTicket" && match.player2.id !== "FreeTicket"
    );*/

    // init matches with players
    const newMatchesWithPlayers = mapMatchesWithPlayers(matches, players);
    console.log("competition and players and matches are ready for next round");

    selectedCompetition = {
      competition: competition,
      matchesWithPlayers: newMatchesWithPlayers
    };

    event.sender.send(ipcMessages.UPDATE_MATCHES, selectedCompetition);

    server.sendNextRoundBroadcast({
      matchesWithPlayers: selectedCompetition.matchesWithPlayers
    });
  });

  ipcMain.on(ipcMessages.CANCEL_ROUND, (event) => {
    // check if it's a valid state transition (double check if all games are finished?)
    const { competition } = selectedCompetition;

    // TODO: remove round from storage
    // 1. delete round from db
    const { currentRound } = competition;

    // 2. load last round

    // 3. update round and send to GUIs

    server.sendCancelRoundBroadcast();
  });

  ipcMain.on(ipcMessages.GET_RANKING_REQUEST, event => {
    console.log("ipc-renderer --> ipc-main", ipcMessages.GET_RANKING_REQUEST);

    if (!statisticWindow) {
      return;
    }

    updateRanking();
  });
}

function initCompetition(competitionId) {
  // get competition from meta repository
  let competition = metaRepository.getCompetition(competitionId);
  console.log(`Get competition ${competitionId} from competitions`);

  // init competition storage
  const filePath = fileManager.getCompetitionFilePath(competitionId);
  competitionStorage.init(filePath, config.USE_IN_MEMORY_STORAGE);

  // get players from competition storage
  let players = competitionStorage.getAllPlayers();
  console.log("Get players from competition database");

  // init matches ...
  let matches;
  if (competition.state === COMPETITION_STATE.COMP_CREATED) {
    // ... with matchmakers first round
    const drawing = createMatchesWithMatchmaker(players, []);
    players = drawing.players;
    matches = drawing.matches;

    // update competition in database
    const { currentRound } = competition;
    competition = setCompetitionRoundMatches(
      competition,
      currentRound,
      matches
    );
    competition = setCompetitionState(
      competition,
      COMPETITION_STATE.COMP_READY_ROUND_READY
    );
    metaRepository.updateCompetition(competition);
  } else {
    // ... from competition storage

    const { currentRound, rounds } = competition;
    const { matchIds } = rounds.find(
      round => round.roundNumber === currentRound
    );
    console.log(matchIds);

    matches = competitionStorage.getMatchesByIds(matchIds);
    console.log("Get matches from competition database");
  }

  // init matches with players
  const matchesWithPlayers = mapMatchesWithPlayers(matches, players);
  console.log("competition and players and matches are selected");

  return { competition, matchesWithPlayers };
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

  // update competition
  competitionStorage.updatePlayers(players);
  competitionStorage.createMatches(matches);
  console.log("Save matches and player in competition storage");

  return { matches, players };
}

function updateCompetitionState(competition, newState) {
  console.log("Change competition state:", competition.state, "-->", newState);
  competition = setCompetitionState(competition, newState);
  metaRepository.updateCompetition(competition);
  return competition;
}

function updateSetsByTableNumber(tableNumber, sets) {
  selectedCompetition.matchesWithPlayers = selectedCompetition.matchesWithPlayers.map(
    matchWithPlayers => {
      if (matchWithPlayers.tableNumber === tableNumber) {
        // 3. update sets of match
        const { match } = matchWithPlayers;
        const updatedMatch = { ...match, sets };
        matchWithPlayers.match = updatedMatch;

        // 4. save match to storage
        updateMatch(matchWithPlayers);
      }

      return matchWithPlayers;
    }
  );
}

function updateMatch(matchWithPlayers) {
  const match = getMatchFromMatchWithPlayer(matchWithPlayers);
  competitionStorage.updateMatch(match);
}

function updateRanking() {
  // get current players and matches
  let matches = [];
  let players = [];
  selectedCompetition.matchesWithPlayers.forEach(matchWithPlayers => {
    const { player1, player2 } = matchWithPlayers.match;

    matches.push(matchWithPlayers.match);
    players.push(player1);
    players.push(player2);
  });

  const rankings = createCurrentRanking(players, matches);
  console.log("update ranking table");

  if (!statisticWindow) {
    return;
  }

  statisticWindow.webContents.send(ipcMessages.UPDATE_RANKING, {
    competition: selectedCompetition.competition,
    rankings
  });
}

function mapMatchesWithPlayers(matches, players) {
  let tableNumber = 1;

  let matchesWithPlayers = [];
  matches.forEach(match => {
    const uuid = server.getConnectedDeviceByTableNumber(tableNumber);

    match.player1 = players.find(player => player.id === match.player1);
    match.player2 = players.find(player => player.id === match.player2);

    const matchWithPlayers = {
      tableNumber: tableNumber,
      connectedDevice: uuid,
      match: match
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
