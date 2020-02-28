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

let currentCompetition = null;
let matchesWithPlayers = [];
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

      if (matchesWithPlayers.length > 0) {
        matchesWithPlayers = matchesWithPlayers.map(match => {
          if (match.tableNumber === tableNumber) {
            return { ...match, connectedDevice };
          }

          return match;
        });
      }

      mainWindow.webContents.send(ipcMessages.UPDATE_MATCHES, {
        matchesWithPlayers: matchesWithPlayers
      });
    }
  );

  server.ServerMainIOConnection.on(serverMessages.STATE_REQUEST, args => {
    console.log("Server-->IPC-Main:", serverMessages.STATE_REQUEST);
    console.log(args);
    const { tableNumber } = args;

    const responseData = createStateResponseData({
      competitions,
      matchesWithPlayers,
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
    if (currentCompetition) {
      // ... than reset application state
      currentCompetition = null;
      matchesWithPlayers = [];
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

  ipcMain.on(ipcMessages.GET_SINGLE_COMPETITION_REQUEST, (event, args) => {
    console.log(
      "ipc-renderer --> ipc-main",
      ipcMessages.GET_SINGLE_COMPETITION_REQUEST
    );

    if (!args) {
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
      selectedCompetition = createCompetitionFromJSON(jsonObject.tournament);
      selectedPlayers = createPlayersFromJSON(jsonObject);

      // 5. do resets
      xmlFilePath = null;
    } else {
      const { competitionId } = args;

      if (!competitionId) {
        console.log("Parameter competitionId is not initialized");
        return;
      }

      if (competitions.length > 0) {
        selectedCompetition = competitions.find(
          competition => competition.id === competitionId
        );
      } else {
        console.log("workflow fehler?");
        return; // Fehler: Workflow
      }

      // 2. load players from competition storage
      const filePath = fileManager.getCompetitionFilePath(competitionId);
      competitionStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);
      selectedPlayers = competitionStorage.getAllPlayers();

      // 3. load matches from competition storage
      selectedMatches = competitionStorage.getMatchesByIds(
        selectedCompetition.round_matchIds
      );
    }
    console.log("competition and players are selected");

    // send data back to ipc-renderer { competition, players } (for players use matchmaker)
    event.sender.send(ipcMessages.GET_SINGLE_COMPETITION_RESPONSE, {
      competition: selectedCompetition,
      players: selectedPlayers
    });
    console.log(
      "ipc-main --> ipc-renderer:",
      ipcMessages.GET_SINGLE_COMPETITION_RESPONSE
    );
  });

  ipcMain.on(ipcMessages.IMPORT_XML_FILE_REQUEST, event => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.IMPORT_XML_FILE_REQUEST
    );

    let args;
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

      if (currentCompetition) {
        // TODO: Wann fliegt dieser Fehler?
        const errorMessage =
          "A competition is already loaded. Do you want to pause the current?";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      // 1. initialize competition storage
      // 1.1. open competition storage and init with json object
      const competitionFilePath = fileManager.getCompetitionFilePath(
        selectedCompetition.id
      );
      competitionStorage.open(
        competitionFilePath,
        config.USE_IN_MEMORY_STORAGE
      );
      competitionStorage.initWithCompetition(jsonObject);
      console.log("Initialized competition storage with json object");

      // notify react app that import is ready and was successful
      const returnData = {
        competitionId: selectedCompetition.id,
        message: "success"
      };
      event.sender.send(ipcMessages.IMPORT_XML_FILE_RESPONSE, returnData);
      // 1.2. use matchmaker to draw the first round and update players
      selectedMatches = matchmaker.drawRound(selectedPlayers);
      selectedPlayers = updatePlayersAfterDrawing(
        selectedPlayers,
        selectedMatches
      );
      console.log("Matchmaker drew the first round");

      // 1.3. store matches and players into the competition storage
      competitionStorage.createMatches(selectedMatches);
      competitionStorage.createPlayers(selectedPlayers);
      console.log("Save matches and players into competition storage");

      // 2. update competition and save competition into meta storage
      selectedCompetition = updateCompetitionRoundMatches(
        selectedCompetition,
        selectedMatches
      );
      selectedCompetition = updateCompetitionStatus(
        selectedCompetition,
        COMPETITION_STATE.COMP_READY_ROUND_READY
      );
      metaStorage.createCompetition(selectedCompetition);
      console.log("Create competition in meta storage");

      // reset app state variables
      jsonObject = null;

      // 3. create response message with success message
      args = { competitionId: selectedCompetition.id, message: "success" };
    } catch (err) {
      // notify react app that a error has happened
      console.log(err.message);
      const returnData = { competitionId: "", message: err.message };
      event.sender.send(ipcMessages.IMPORT_XML_FILE_RESPONSE, returnData);
      args = { competitionId: "", message: err.message };
    } finally {
      // notify react app about the import status
      event.sender.send(ipcMessages.IMPORT_XML_FILE_RESPONSE, args);
      console.log(
        "ipc-main --> ipc-renderer:",
        ipcMessages.IMPORT_XML_FILE_RESPONSE
      );
    }
  });

  ipcMain.on(ipcMessages.GET_MATCHES, (event, args) => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.GET_MATCHES);
    const { competitionId } = args;

    if (!currentCompetition) {
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

      // initialize current competition
      currentCompetition = selectedCompetition;
      initMatchesWithPlayers(selectedMatches, selectedPlayers);
      console.log("Set current competition");
      console.log("init matches with players");

      // reset selected state
      selectedCompetition = null;
      selectedPlayers = [];
      selectedMatches = [];
    } else {
      if (currentCompetition.id !== competitionId) {
        console.log("Workflow fehler");
        return;
      }
    }

    event.sender.send(ipcMessages.UPDATE_MATCHES, {
      matchesWithPlayers: matchesWithPlayers
    });
    console.log("ipc-main --> ipc-renderer:", ipcMessages.UPDATE_MATCHES);
  });

  ipcMain.on(ipcMessages.START_ROUND, () => {
    console.log("ipc-renderer --> ipc-main:", ipcMessages.START_ROUND);

    if (matchStarted) {
      return;
    }

    if (currentCompetition.state !== COMPETITION_STATE.COMP_READY_ROUND_READY) {
      return;
    }

    const updatedCompetition = updateCompetitionStatus(
      currentCompetition,
      COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
    );

    currentCompetition = updatedCompetition;
    metaStorage.updateCompetition(updatedCompetition);

    matchStarted = true;
    server.sendStartRoundBroadcast();
  });

  ipcMain.on(ipcMessages.NEXT_ROUND, () => {
    // check if it's a valid state transition (double check if all games are finished?)
    // fire up matchmaker
    // save things
    const updatedCompetition = updateCompetitionStatus(
      currentCompetition,
      COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
    );

    // TODO: check this with Marco
    currentCompetition = updatedCompetition;
    metaStorage.updateCompetition(updatedCompetition);

    const matchesWithoutFreeTickets = matchesWithPlayers.filter(
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

function initMatchesWithPlayers(matches, players) {
  let tableNumber = 1;
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
}

function initializeMatchesByCompetitionId(id) {
  if (matchesWithPlayers.length > 0) {
    return;
  }

  // 1. open competition storage
  const filePath = fileManager.getCompetitionFilePath(id);
  competitionStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);

  // 2. get players and current matches from competition
  const currentRoundMatchIds = currentCompetition.round_matchIds;
  const matches = competitionStorage.getMatchesByIds(currentRoundMatchIds);
  const players = competitionStorage.getAllPlayers();

  initMatchesWithPlayers(matches, players);
}
