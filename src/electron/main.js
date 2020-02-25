/**
 * @author Marco Goebel
 */

const { app, ipcMain } = require("electron");
const path = require("path");

// electron reload
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

// browser windows
const uiActions = require("./actions/uiActions");
const createMenu = require("./menu/main-menu");
const createWindow = require("./window");

// configuration
const config = require("./config");

// xml import
const { importXML } = require("../modules/import/xml-import");

// models
const { setCompetitionStatus } = require("../modules/models/competition");

// persistence
const fileManager = require("../modules/persistance/file-manager");
const metaStorage = require("../modules/persistance/lowdb/meta-storage");
const competitionStorage = require("../modules/persistance/lowdb/competition-storage");

// communication
const server = require("../modules/server/server");
const socketIOChannels = require("../client/src/shared/socket-io-channels");
const ipcChannels = require("../shared/ipc/ipcChannels");

let mainWindow = null;

let competition = null;
let matchesWithPlayers = [];

app.on("ready", () => {
  initDevTools();

  // initialize modules
  initMetaStorage();
  initHTTPServer(config.SERVER_PORT);

  // create GUI
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

ipcMain.on(ipcChannels.START_ROUND, () => {
  server.sendStartRoundBroadcast();
});

ipcMain.on(ipcChannels.GET_ALL_COMPETITIONS, event => {
  const competitions = metaStorage.getAllCompetitions();
  console.log("Retrieved competitions from database", competitions.length);

  event.sender.send(ipcChannels.GET_ALL_COMPETITIONS, {
    competitions: competitions
  });
});

ipcMain.on(ipcChannels.DELETE_COMPETITION, (event, data) => {
  const { id } = data;

  if (!config.USE_IN_MEMORY_STORAGE) {
    fileManager.deleteTournamentJSONFile(id);
  }
  metaStorage.deleteCompetition(id);

  event.sender.send(ipcChannels.DELETE_COMPETITION);
});

ipcMain.on(ipcChannels.OPEN_IMPORT_DIALOG, event => {
  uiActions.openXMLFile().then(xmlFilePath => {
    event.sender.send(ipcChannels.OPEN_IMPORT_DIALOG_SUCCESS, {
      xmlFilePath: xmlFilePath
    });
  });
});

ipcMain.on(ipcChannels.IMPORT_XML_FILE, (event, args) => {
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
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, arguments);
  } catch (err) {
    // notify react app that a error has happend
    console.log(err.message);
    const arguments = { competitionId: "", message: err.message };
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, arguments);
  }
});

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

ipcMain.on(ipcChannels.GET_MATCHES_BY_COMPETITON_ID, (event, args) => {
  const { id } = args;

  // 1. initialize competition
  competition = metaStorage.getCompetition(id);

  // 2. initialize matches of competition
  initializeMatchesByCompetitionId(id);

  // 3. send matches to renderer
  event.sender.send(ipcChannels.UPDATE_MATCHES, {
    matchesWithPlayers: matchesWithPlayers
  });
});

ipcMain.on(ipcChannels.OPEN_NEW_WINDOW, (event, args) => {
  const { route } = args;
  createWindow(route);
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

function initMetaStorage() {
  const filePath = fileManager.getMetaStorageDatabasePath();
  metaStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);
}

function initHTTPServer(port) {
  server.initHTTPServer(port);

  server.SocketIOInputEmitter.on(socketIOChannels.LOGIN_TABLE, args => {
    console.log("Client-->Server:", args);
    const { connectedDevice, tableNumber } = args;

    if (matchesWithPlayers.length > 0) {
      matchesWithPlayers = matchesWithPlayers.map(match => {
        if (match.tableNumber === tableNumber) {
          return { ...match, connectedDevice };
        }

        return match;
      });
    }

    mainWindow.webContents.send(ipcChannels.UPDATE_MATCHES, {
      matchesWithPlayers: matchesWithPlayers
    });
  });

  server.SocketIOInputEmitter.on(socketIOChannels.GET_MATCH, args => {
    const { tableNumber } = args;

    const matchWithPlayers = matchesWithPlayers.find(
      matchWithPlayers => matchWithPlayers.tableNumber === tableNumber
    );
    console.log(`Table ${tableNumber} execute get match`, matchWithPlayers);

    server.SocketIOOutputEmitter.emit(socketIOChannels.SEND_MATCH, {
      matchWithPlayers: matchWithPlayers
    });
  });
}
