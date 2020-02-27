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
const { importXML, readCompetitionXMLFileFromDisk, convertXMLToJSON } = require("../modules/import/xml-import");

// models
const {
  createCompetitionFromJSON,
  setCompetitionStatus,
  COMPETITION_STATE
} = require("../modules/models/competition");
const { createPlayersFromJSON } = require("../matchmaker/player");

// persistence
const fileManager = require("../modules/persistance/file-manager");
const metaStorage = require("../modules/persistance/lowdb/meta-storage");
const competitionStorage = require("../modules/persistance/lowdb/competition-storage");

// communication
const server = require("../modules/server/server");
const serverMessages = require("../modules/server/server-messages");
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

let competition = null;
let players = null;
let matchesWithPlayers = [];

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

  server.SocketIOInputEmitter.on(
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
  });

  ipcMain.on(ipcMessages.DELETE_COMPETITION_REQUEST, (event, data) => {
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.DELETE_COMPETITION_REQUEST
    );
    const { competitionId } = data;

    // check if a competition is selected ...
    if (competition) {
      // ... than reset application state
      competition = null;
      matchesWithPlayers = [];
      console.log("Reset application state");
    }

    deleteCompetition(competitionId);

    event.sender.send(ipcMessages.DELETE_COMPETITION_RESPONSE);
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
    });
  });

  ipcMain.on(ipcMessages.GET_SINGLE_COMPETITION_REQUEST, (event, args) => {
    console.log("ipc-renderer --> ipc-main", ipcMessages.GET_SINGLE_COMPETITION_REQUEST);

    // check if a xml file is selected --> Fehler: XML-Datei ist nicht ausgewählt
    if (!xmlFilePath) {
      return;
    }

    if (!args) {
      // 1. load xml file
      const xmlContent = readCompetitionXMLFileFromDisk(xmlFilePath);

      // TODO:
      // 2. validate xml file against xml-schema --> Fehler: XML-Datei ist nicht valide

      // 3. convert xml file to JSON-Object
      jsonObject = convertXMLToJSON(xmlContent);

      // 4. parse JSON-Object for necessary data
      competition = createCompetitionFromJSON(jsonObject.tournament);
      players = createPlayersFromJSON(jsonObject);
    } else {
      const { competitionId } = args;

      // 1. load competition from meta data storage
      competition = metaStorage.getCompetition(competitionId);

      // 2. load players from competition storage
      const filePath = fileManager.getCompetitionFilePath(competitionId);
      competitionStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);
      players = competitionStorage.getAllPlayers();
    }

    // send data back to ipc-renderer { competition, players } (for players use matchmaker)
    console.log("init competition and players");
    event.sender.send(ipcMessages.GET_SINGLE_COMPETITION_RESPONSE, { competition, players });
  });

  ipcMain.on(ipcMessages.IMPORT_XML_FILE_REQUEST, (event, args) => {
    try {
      const { xmlFilePath } = args;
      competition = importXML(
        xmlFilePath,
        fileManager,
        metaStorage,
        competitionStorage
      );

      // notify react app that import is ready and was successful
      const arguments = { competitionId: competition.id, message: "success" };
      event.sender.send(ipcMessages.IMPORT_XML_FILE_RESPONSE, arguments);
    } catch (err) {
      // notify react app that a error has happened
      console.log(err.message);
      const arguments = { competitionId: "", message: err.message };
      event.sender.send(ipcMessages.IMPORT_XML_FILE_RESPONSE, arguments);
    }
  });

  ipcMain.on(ipcMessages.GET_MATCHES, (event, args) => {
    const { id } = args;

    // 1. initialize competition
    competition = metaStorage.getCompetition(id);

    // 2. initialize matches of competition
    initializeMatchesByCompetitionId(id);

    // 3. send matches to renderer
    event.sender.send(ipcMessages.UPDATE_MATCHES, {
      matchesWithPlayers: matchesWithPlayers
    });
  });

  ipcMain.on(ipcMessages.START_ROUND, () => {
    server.sendStartRoundBroadcast();
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

function initializeMatchesByCompetitionId(id) {
  if (matchesWithPlayers.length > 0) {
    return;
  }

  // 1. open competition storage
  const filePath = fileManager.getCompetitionFilePath(id);
  competitionStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);

  // 2. get players and current matches from competition
  const currentRoundMatchIds = competition.round_matchIds;
  const matches = competitionStorage.getMatchesByIds(currentRoundMatchIds);
  const players = competitionStorage.getAllPlayers();

  // 3. map communication object
  let tableNumber = 1;
  matches.forEach(match => {
    const player1 = players.find(player => player.id === match.player1);
    const player2 = players.find(player => player.id === match.player2);

    const uuid = server.getConnectedDeviceByTableNumber(tableNumber);

    const matchWithPlayers = {
      tableNumber: tableNumber,
      connectedDevice: uuid,
      match: match,
      player1: player1,
      player2: player2
    };

    matchesWithPlayers.push(matchWithPlayers);
    tableNumber++;
  });

  // 4. update competition status
  setCompetitionStatus(competition, false, false);
  metaStorage.updateCompetition(competition);
}
