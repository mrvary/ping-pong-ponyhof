/**
 * @author Marco Goebel
 */

const { app, ipcMain, BrowserWindow, Menu } = require("electron");
const path = require("path");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

const config = require("./config");
const uiActions = require("./actions/uiActions");
const menu = require("./menu/main-menu");

// server dependencies
const server = require("../modules/server");

// import
const { readTournamentXMLFileFromDisk } = require("../modules/import/xml-import");

// persistence
const file_manager = require("../modules/persistance/file-manager");
const file_storage = require("../modules/persistance/lowdb/file-storage");
const competition_storage = require("../modules/persistance/lowdb/competition-storage");

// models
const { createCompetitionFromJSON } = require("../modules/models/competition");
const { createPlayersFromJSON } = require("../matchmaker/player");

// matchmaker
const matchmaker = require("../matchmaker/drawing");

// frontend dependencies
const ipcChannels = require("../react/ipc/ipcChannels");

let mainWindow;

function createMainWindow() {
  // create the browser window ...
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(
      __dirname,
      "../assets/icons/png/app-icon/app-icon_16x16.png"
    ),
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  // ...and load the frontend react app
  mainWindow.loadURL(config.ELECTRON_START_URL);

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // set custom application menu
  Menu.setApplicationMenu(menu);
}

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

function initFileDatabase() {
  const filePath = file_manager.getCompetitionDatabasePath();
  file_storage.open(filePath);
}

function initHTTPServer() {
  const port = config.SERVER_PORT;
  server.setupHTTPServer(port);
  server.setupSocketIO();
}

app.on("ready", () => {
  initDevTools();

  initFileDatabase();
  initHTTPServer();

  createMainWindow();
});

app.on("before-quit", () => {
  server.shutdownServer();
});

// app.on("window-all-closed", () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow();
  }
});

ipcMain.on(ipcChannels.START_ROUND, () => {
  server.sendStartRoundBroadcast();
});

ipcMain.on(ipcChannels.OPEN_IMPORT_DIALOG, event => {
  uiActions.openXMLFile().then((xmlFilePath) => {
    event.sender.send(ipcChannels.OPEN_IMPORT_DIALOG_SUCCESS, { xmlFilePath: xmlFilePath })
  });
});

ipcMain.on(ipcChannels.IMPORT_XML_FILE, (event, args) => {
  try {
    const { xmlFilePath } = args;

    if (!xmlFilePath) {
      return;
    }

    // read xml file from disk and convert it to json
    const jsonObject = readTournamentXMLFileFromDisk(xmlFilePath);

    // save tournament as json file
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    file_manager.createTournamentJSONFile(competition.id, jsonObject);
    file_storage.createCompetition(competition);

    // use matchmaker to draw first round
    console.log("Matchmaker draw matches");
    const players = createPlayersFromJSON(jsonObject);
    const matches = matchmaker.drawRound(players);
    console.log((matches));

    // save matches into tournament file
    const filePath = file_manager.getCompetitionFilePath(competition.id);
    competition_storage.open(filePath);
    competition_storage.createMatches(matches);

    // notify react app that import is ready and was successful
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, { competitionId: competition.id, message: "success" });
  } catch (err) {
    // notify react app that a error has happend
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, { competitionId: '', message: err.message })
  }
});

ipcMain.on(ipcChannels.GET_ALL_COMPETITIONS, event => {
  const competitions = file_storage.getAllCompetitions();
  console.log("Retrieved competitions from database", competitions.length);

  event.sender.send(ipcChannels.GET_ALL_COMPETITIONS, {
    competitions: competitions
  });
});

ipcMain.on(ipcChannels.DELETE_COMPETITION, (event, data) => {
  const { id } = data;

  file_manager.deleteTournamentJSONFile(id);
  file_storage.deleteCompetition(id);

  event.sender.send(ipcChannels.DELETE_COMPETITION);
});
