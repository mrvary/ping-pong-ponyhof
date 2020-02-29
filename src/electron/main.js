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
const {
  readCompetitionXMLFileFromDisk,
  convertXMLToJSON
} = require("../modules/import/xml-import");

// competition model
const {
  COMPETITION_STATE,
  createCompetitionFromJSON,
  updateCompetitionRoundMatches,
  updateCompetitionStatus
} = require("../modules/models/competition");

const {
  createStateResponseData,
  createUpdateSetsResponseData
} = require("./helper/mainHelper");

// player model
const {
  createPlayersFromJSON,
  updatePlayersAfterDrawing
} = require("../matchmaker/player");

// matchmaker
const matchmaker = require("../matchmaker/drawing");

// persistence
const fileManager = require("../modules/persistance/file-manager");
const metaStorage = require("../modules/persistance/lowdb/meta-storage");
const competitionStorage = require("../modules/persistance/lowdb/competition-storage");

// communication
const server = require("../modules/server/server");
const serverMessages = require("../modules/server/serverMessages");
const ipcMessages = require("../shared/ipc-messages");

// windows actions
const uiActions = require("./actions/uiActions");
const createMenu = require("./menu/main-menu");
const createWindow = require("./window");

// electron windows
let mainWindow = null;

// application state variables
let xmlFilePath = null;
let jsonObject = null;

let competitions = null;

let selectedCompetition = null;
let selectedPlayers = null;
let selectedMatches = null;
let selectedMatchesWithPlayers = [];

let activeCompetition = null;
let activePlayers = null;
let activeMatches = null;
let activeMatchesWithPlayers = [];

let matchStarted = false;

// init communication events
registerIPCMainEvents();
initHTTPServer();

app.on("ready", () => {
  initDevTools();
  mainWindow = createWindow();
  createMenu();
});

app.on("before-quit", () => {
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
      console.log(args);
      const { connectedDevice, tableNumber } = args;

      if (selectedMatchesWithPlayers.length > 0) {
        selectedMatchesWithPlayers = selectedMatchesWithPlayers.map(match => {
          if (match.tableNumber === tableNumber) {
            return { ...match, connectedDevice };
          }

          return match;
        });
      }

      mainWindow.webContents.send(ipcMessages.UPDATE_MATCHES, {
        matchesWithPlayers: selectedMatchesWithPlayers
      });
    }
  );

  server.ServerMainIOConnection.on(serverMessages.STATE_REQUEST, args => {
    console.log("Server-->IPC-Main:", serverMessages.STATE_REQUEST);
    console.log(args);
    const { tableNumber } = args;

    const responseData = createStateResponseData({
      competitions,
      selectedMatchesWithPlayers,
      tableNumber
    });

    server.ServerMainIOConnection.emit(
      serverMessages.STATE_RESPONSE,
      responseData
    );
  });

  server.ServerMainIOConnection.on(serverMessages.UPDATE_SETS, args => {
    console.log("Server-->IPC-Main:", serverMessages.UPDATE_SETS);
    console.log(args);

    const responseData = createUpdateSetsResponseData();

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
    // check if competitions are loaded from database
    if (!competitions) {
      // init competitions from database
      competitions = getCompetitionsFromDatabase();
    }

    // send competitions to renderer process
    event.sender.send(ipcMessages.GET_COMPETITIONS_RESPONSE, { competitions });
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

    // check if a competition is selected ...
    if (activeCompetition) {
      // ... than reset application state
      activeCompetition = null;
      activeMatchesWithPlayers = [];
      console.log("Reset application state");
    }

    deleteCompetition(competitionId);

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
      let message = "success";

      if (filePath) {
        xmlFilePath = filePath;
        console.log("Selected XML File:", xmlFilePath);
      } else {
        message = "cancel";
      }

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

    // check if a xml file is selected --> Fehler: XML-Datei ist nicht ausgewählt
    if (!xmlFilePath) {
      return;
    }

    // 1. load xml file
    const xmlContent = readCompetitionXMLFileFromDisk(xmlFilePath);

    // TODO:
    // 2. validate xml file against xml-schema --> Fehler: XML-Datei ist nicht valide

    // 3. convert xml file to JSON-Object
    jsonObject = convertXMLToJSON(xmlContent);

    // 4. parse JSON-Object for necessary data
    selectedCompetition = createCompetitionFromJSON(jsonObject);
    selectedPlayers = createPlayersFromJSON(jsonObject);
    console.log(`competition and players are selected`);

    // reset selected xml file
    xmlFilePath = null;

    const returnData = {
      competition: selectedCompetition,
      players: selectedPlayers
    };

    // send data back to ipc-renderer { competition, players }
    event.sender.send(ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE, returnData);
    console.log(
      "ipc-main --> ipc-renderer:",
      ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE
    );
  });

  ipcMain.on(ipcMessages.IMPORT_XML_FILE_REQUEST, event => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.IMPORT_XML_FILE_REQUEST
    );

    let returnData;

    try {
      if (!selectedCompetition) {
        const errorMessage = "Competition is not initialized";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      if (!selectedPlayers) {
        const errorMessage = "Players is not initialized";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      const { matches, players } = createMatchesWithMatchmaker(selectedPlayers);

      const competitionFilePath = fileManager.getCompetitionFilePath(
        selectedCompetition.id
      );
      initCompetitionDatabase(
        competitionFilePath,
        players,
        matches,
        jsonObject
      );

      selectedCompetition = createCompetitionInMetaStorage(
        selectedCompetition,
        matches
      );
      selectedPlayers = players;
      selectedMatches = matches;

      // reset app state variables
      jsonObject = null;

      // 3. create response message with success message
      returnData = {
        competitionId: selectedCompetition.id,
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
      console.log("Parameter competitionId is not initialized");
      return;
    }

    // check if xml was imported
    if (!selectedCompetition) {
      // get selected competition from competitions
      selectedCompetition = competitions.find(
        competition => competition.id === competitionId
      );
      console.log("Select competition from competitions");

      // load players from competition storage
      const filePath = fileManager.getCompetitionFilePath(competitionId);
      competitionStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);
      selectedPlayers = competitionStorage.getAllPlayers();
      console.log("Select players from competition database");

      // 3. load matches from competition storage
      selectedMatches = competitionStorage.getMatchesByIds(
        selectedCompetition.round_matchIds
      );
      console.log("Select matches from competition database");
    }

    // init current competition
    if (!selectedCompetition) {
      console.log("Competition is not initialized");
      return; // --> Fehler: Competition ist nicht initialisiert
    }

    if (!selectedPlayers) {
      console.log("Players is not initialized");
      return; // --> Fehler: Players sind nicht initialisiert
    }

    if (!selectedMatches) {
      console.log("Matches is not initialized");
      return; // --> Fehler: Matches sind nicht initialisiert
    }

    if (selectedMatchesWithPlayers.length === 0) {
      selectedMatchesWithPlayers = mapMatchesWithPlayers(
        selectedMatches,
        selectedPlayers
      );
      console.log("competition and players and matches are selected");
    }

    event.sender.send(ipcMessages.UPDATE_MATCHES, {
      matchesWithPlayers: selectedMatchesWithPlayers
    });
    console.log("ipc-main --> ipc-renderer:", ipcMessages.UPDATE_MATCHES);
  });

  ipcMain.on(ipcMessages.START_ROUND, () => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.START_ROUND);

    if (matchStarted) {
      return;
    }

    if (activeCompetition.state !== COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
      return;
    }

    const updatedCompetition = updateCompetitionStatus(
      activeCompetition,
      COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
    );

    activeCompetition = updatedCompetition;
    metaStorage.updateCompetition(updatedCompetition);

    matchStarted = true;
    server.sendStartRoundBroadcast();
  });

  ipcMain.on(ipcMessages.NEXT_ROUND, () => {
    if (activeCompetition.state !== COMPETITION_STATE.COMP_READY_ROUND_READY) {
      return;
    }

    // check if it's a valid state transition (double check if all games are finished?)
    // fire up matchmaker
    // save things
    const updatedCompetition = updateCompetitionStatus(
      activeCompetition,
      COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
    );

    // TODO: check this with Marco
    activeCompetition = updatedCompetition;
    metaStorage.updateCompetition(updatedCompetition);

    const matchesWithoutFreeTickets = selectedMatchesWithPlayers.filter(
      ({ player1, player2 }) =>
        player1.id !== "FreeTicket" && player2.id !== "FreeTicket"
    );

    server.sendNextRoundBroadcast({
      matchesWithPlayers: matchesWithoutFreeTickets
    });
  });

  ipcMain.on(ipcMessages.OPEN_NEW_WINDOW, (event, args) => {
    const { route } = args;
    createWindow(route);
  });
}

function getCompetitionsFromDatabase() {
  const filePath = fileManager.getMetaStorageDatabasePath();

  metaStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);
  const competitions = metaStorage.getAllCompetitions();
  console.log(`Get ${competitions.length} elements from database`);

  return competitions;
}

// Delete competition from meta storage and the corresponding competition database file
function deleteCompetition(competitionId) {
  fileManager.deleteTournamentJSONFile(competitionId);
  metaStorage.deleteCompetition(competitionId);
}

// Initialize competition storage with default values
function initCompetitionDatabase(filePath, players, matches, jsonObject) {
  competitionStorage.openStorage(filePath, config.USE_IN_MEMORY_STORAGE);
  competitionStorage.initStateWithDefaults(jsonObject);
  console.log("Initialized competition storage with json object");

  // store matches and players into the competition storage
  storeMatchesAndPlayersInCompetitionDatabase(filePath, players, matches);
}

function storeMatchesAndPlayersInCompetitionDatabase(
  filePath,
  players,
  matches
) {
  competitionStorage.openStorage(filePath, config.USE_IN_MEMORY_STORAGE);
  competitionStorage.createPlayers(players);
  competitionStorage.createMatches(matches);
  console.log("Save matches and players into competition storage");
}

// use matchmaker to draw the next round and update players
function createMatchesWithMatchmaker(players) {
  const matches = matchmaker.drawRound(players);
  players = updatePlayersAfterDrawing(players, matches);
  console.log("Matchmaker drew a round");

  return { matches, players };
}

// update competition and create competition in meta storage
function createCompetitionInMetaStorage(competition, matches) {
  competition = updateCompetitionRoundMatches(competition, matches);
  competition = updateCompetitionStatus(
    competition,
    COMPETITION_STATE.COMP_READY_ROUND_READY
  );

  metaStorage.createCompetition(competition);
  console.log("Create competition in meta storage");

  return competition;
}

function mapMatchesWithPlayers(matches, players) {
  let tableNumber = 1;

  let matchesWithPlayers = [];
  matches.forEach(match => {
    const player1 = players.find(player => player.id === match.player1);
    const player2 = players.find(player => player.id === match.player2);
    match.player1 = player1;
    match.player2 = player2;

    const uuid = server.getConnectedDeviceByTableNumber(tableNumber);

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
