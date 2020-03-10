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
const dbManager = require("../modules/persistance/database-manager");

// communication
const server = require("../modules/server/server");
const serverMessages = require("../modules/server/serverMessages");
const ipcMessages = require("../shared/ipc-messages");

// client
const { isMatchFinished } = require("../client/src/shared/lib");

// windows dialog
const uiActions = require("./dialog/dialog");
const { createMenu, registerAction } = require("./menu/main-menu");
const createWindow = require("./window");

// electron windows
let mainWindow = null;
let statisticWindow = null;

// application state variables
let selectedCompetition = null;

const exportXML = () => {
  const fileName = "exportTournament.xml";
  const filePath = fileManager.getApplicationDir("documents") + "/" + fileName;

  if (selectedCompetition) {
    uiActions.showSaveDialog(filePath).then(filePath => {
      const { competition, matchesWithPlayers } = selectedCompetition;

      // get players and matches
      const players = competitionStorage.getAllPlayers();
      const matches = competitionStorage.getAllMatches();
      const jsonObject = competitionStorage.getImportedData();

      xmlExporter.exportXML(players, matches, jsonObject);
    });
  }
};

// init communication events
registerIPCMainEvents();
initHTTPServer();

app.on("ready", () => {
  initDevTools();

  // init competitions storage
  dbManager.initMetaRepository(config.USE_IN_MEMORY_STORAGE);

  // init main window
  mainWindow = createWindow();
  registerAction("export", exportXML);
  createMenu();
});

app.on("before-quit", () => {
  let { competition, matchesWithPlayers } = selectedCompetition;

  // Set current active competition to ready state
  let newState;
  if (competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
    newState = COMPETITION_STATE.COMP_READY_ROUND_READY;
  } else if (competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
    newState = COMPETITION_STATE.COMP_READY_ROUND_ACTIVE;
  }

  updateCompetitionState(competition, newState);

  // Save current app state into storages
  const { players, matches } = splitMatchesWithPlayer(matchesWithPlayers);

  const playerRepository = dbManager.getPlayerRepository();
  playerRepository.updatePlayers(players);

  const matchRepository = dbManager.getMatchRepository();
  matchRepository.updateMatches(matches);

  // send disconnect to clients
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
    updateRanking();

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

function registerIPCMainEvents() {
  ipcMain.on(ipcMessages.GET_COMPETITIONS_REQUEST, event => {
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
  });

  ipcMain.on(ipcMessages.DELETE_COMPETITION_REQUEST, (event, data) => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.DELETE_COMPETITION_REQUEST
    );
    const { competitionId } = data;

    // check if the current competition is the deleted competition
    if (
      selectedCompetition &&
      selectedCompetition.competition.id === competitionId
    ) {
      selectedCompetition = null;
    }

    // delete competition from database
    dbManager.deleteCompetitionStorage(competitionId);

    // notify renderer that the competition is deleted
    event.sender.send(ipcMessages.DELETE_COMPETITION_RESPONSE);
    console.log(
      "ipc-main --> ipc-renderer:",
      ipcMessages.DELETE_COMPETITION_RESPONSE
    );
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

      const resultData = { message };

      event.sender.send(ipcMessages.OPEN_FILE_DIALOG_RESPONSE, resultData);
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

      // 2. import data into databases
      xmlImporter.importXMLIntoDatabases(dbManager);

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
    const { competition } = selectedCompetition;

    // check if competition has completed
    if (competition.state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
      console.log("wrong state", competition.state);
      return;
    }

    updateSetsByTableNumber(tableNumber, sets);
    updateRanking();

    event.sender.send(ipcMessages.UPDATE_MATCHES, selectedCompetition);
  });

  ipcMain.on(ipcMessages.OPEN_NEW_WINDOW, (event, args) => {
    const { route } = args;

    const isStatisticView = route.includes("statisticTable");
    if (isStatisticView) {
      statisticWindow = createWindow(route);
      statisticWindow.once("close", () => {
        statisticWindow = null;
      });
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
    } else {
      console.log("wrong state", competition.state);
    }
  });

  ipcMain.on(ipcMessages.CANCEL_COMPETITION, event => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.CANCEL_COMPETITION);
    const { competition } = selectedCompetition;

    let newState;
    if (competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
      newState = COMPETITION_STATE.COMP_READY_ROUND_READY;
    } else if (
      competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
    ) {
      newState = COMPETITION_STATE.COMP_READY_ROUND_ACTIVE;
    } else {
      console.log("wrong state", competition.state);
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
      console.log("wrong state", competition.state);
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
    console.log("ipc-renderer --> ipc-main:", ipcMessages.NEXT_ROUND);
    let { competition, matchesWithPlayers } = selectedCompetition;

    // check if it's a valid state transition (double check if all games are finished?)
    if (competition.state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
      console.log("wrong state", competition.state);
      return;
    }

    let { matches, players } = splitMatchesWithPlayer(matchesWithPlayers);

    // check if matches of current round have finished
    let matchesAreFinished = true;
    for (let i = 0; i < matches.length; i++) {
      if (!isMatchFinished(matches[i])) {
        matchesAreFinished = false;
        break;
      }
    }

    // return if a match has not finished
    if (!matchesAreFinished) {
      return;
    }

    // update players data after matches are finished
    players = updateWinner(players, matches);

    // check if the current round was the last round
    if (competition.currentRound === 6) {
      // set competition state to finished
      const newState = COMPETITION_STATE.COMP_COMPLETED;
      competition = updateCompetitionState(competition, newState);

      // update ranking with winners of last round
      updateRanking();

      // TODO: send competition completed broadcast to clients

      selectedCompetition = {
        competition: competition,
        matchesWithPlayers: matchesWithPlayers
      };

      event.sender.send(ipcMessages.UPDATE_MATCHES, selectedCompetition);
      return;
    }

    // use matchmaker to draw next round
    const drawing = createMatchesWithMatchmaker(players, matches);
    players = drawing.players;
    matches = drawing.matches;

    // set round counter of competition to next round
    let { currentRound } = competition;
    let nextRound = currentRound + 1;
    currentRound = nextRound;

    // update current round
    competition = setCompetitionCurrentRound(competition, nextRound);

    // update rounds of competition
    competition = setCompetitionRoundMatches(
      competition,
      currentRound,
      matches
    );

    // update competition state
    const newState = COMPETITION_STATE.COMP_ACTIVE_ROUND_READY;
    competition = setCompetitionState(competition, newState);

    // update competition in storage
    const metaRepository = dbManager.getMetaRepository();
    metaRepository.updateCompetition(competition);

    // init matches with players
    const newMatchesWithPlayers = mapMatchesWithPlayers(matches, players);
    console.log("competition and players and matches are ready for next round");

    selectedCompetition = {
      competition: competition,
      matchesWithPlayers: newMatchesWithPlayers
    };

    event.sender.send(ipcMessages.UPDATE_MATCHES, selectedCompetition);

    updateRanking();

    server.sendNextRoundBroadcast({
      matchesWithPlayers: selectedCompetition.matchesWithPlayers
    });
  });

  ipcMain.on(ipcMessages.CANCEL_ROUND, event => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.CANCEL_ROUND);
    let { competition, matchesWithPlayers } = selectedCompetition;
    const { currentRound } = competition;

    // check if it's a valid state transition (double check if all games are finished?)
    if (
      competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY ||
      competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
    ) {
      if (currentRound === 1) {
        console.log("The first round can not be deleted");
        return;
      }

      // update competition state
      competition = setCompetitionState(
        competition,
        COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
      );

      // send cancel round to clients
      server.sendCancelRoundBroadcast();

      competition = deleteCurrentRound(competition, matchesWithPlayers);
      console.log("Delete round from database");

      const playerRepository = dbManager.getPlayerRepository();
      const players = playerRepository.getAll();

      const matches = getMatchesByRound(competition);

      const previousMatchesWithPlayers = mapMatchesWithPlayers(
        matches,
        players
      );

      selectedCompetition.competition = competition;
      selectedCompetition.matchesWithPlayers = previousMatchesWithPlayers;

      event.sender.send(ipcMessages.UPDATE_MATCHES, selectedCompetition);

      updateRanking();
    } else {
      console.log("wrong state", competition.state);
    }
  });

  ipcMain.on(ipcMessages.GET_RANKING_REQUEST, event => {
    console.log("ipc-renderer --> ipc-main", ipcMessages.GET_RANKING_REQUEST);
    updateRanking();
  });

  ipcMain.on(ipcMessages.GET_IP_ADDRESS_REQUEST, event => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.GET_IP_ADDRESS_REQUEST
    );

    const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
    event.sender.send(ipcMessages.GET_IP_ADDRESS_RESPONSE, { ipAddress: url });
  });
}

function initCompetition(competitionId) {
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
    matches = getMatchesByRound(competition);
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

function updateSetsByTableNumber(tableNumber, sets) {
  const { matchesWithPlayers } = selectedCompetition;

  const updatedMatchesWithPlayers = matchesWithPlayers.map(matchWithPlayers => {
    if (matchWithPlayers.tableNumber === tableNumber) {
      const { match } = matchWithPlayers;
      const updatedMatch = { ...match, sets };
      matchWithPlayers.match = updatedMatch;

      updateMatch(matchWithPlayers);
    }

    return matchWithPlayers;
  });

  selectedCompetition.matchesWithPlayers = updatedMatchesWithPlayers;
}

function updateMatch(matchWithPlayers) {
  const match = getMatchFromMatchWithPlayer(matchWithPlayers);

  const matchRepository = dbManager.getMatchRepository();
  matchRepository.updateMatch(match);
}

function updateRanking() {
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
    competition: selectedCompetition.competition,
    rankings
  });
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
