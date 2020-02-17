/**
 * @author Marco Goebel
 */

const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

const config = require("./config");
const uiActions = require("./actions/uiActions");
const menu = require("./menu/main-menu");

// server dependencies
const server = require("../modules/server");
const database = require("../modules/persistance/sqlite3/dbManager");

// frontend dependencies
const { channels } = require("../shared/channels");

// import
const {
  readTournamentXMLFileFromDisk
} = require("../modules/import/xml-import");

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

  // react dev tools for electron
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require("electron-devtools-installer");

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // set custom application menu
  Menu.setApplicationMenu(menu);
}

function getApplicationDir(directoryName) {
  const appPath = app.getPath("userData");
  const appDataPath = path.join(appPath, directoryName);

  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath);
  }

  return appDataPath;
}

function getDatabasePath() {
  const databaseDir = getApplicationDir("database");
  return path.join(databaseDir, "database.db");
}

app.on("ready", () => {
  // setup sqlite database
  const dbFilePath = config.USE_IN_MEMORY ? ":memory:" : getDatabasePath();
  database.createDatabase(dbFilePath);

  // setup http server
  const port = config.SERVER_PORT;
  server.setupHTTPServer(port);
  server.setupSocketIO();

  // open the main window
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

ipcMain.on(channels.START_ROUND, () => {
  server.sendStartRoundBroadcast();
});

ipcMain.on(channels.OPEN_IMPORT_DIALOG, event => {
  uiActions.openXMLFile().then(filePath => {
    // read xml file from disk and convert it to json
    const jsonObject = readTournamentXMLFileFromDisk(filePath);
    database.importJSONTournament(jsonObject);

    // save tournament as json file
    const appDataPath = getApplicationDir("data");
    const jsonFilePath = path.join(appDataPath, "tournament.json");
    const data = JSON.stringify(jsonObject, null, 2);
    fs.writeFileSync(jsonFilePath, data);

    event.sender.send(channels.FILE_IMPORTED);
  });
});

ipcMain.on(channels.GET_ALL_TOURNAMENTS, event => {
  database.getAllTournaments().then(tournaments => {
    // load files of data dir
    const appDataPath = getApplicationDir("data");
    getDirectoryFiles(appDataPath);

    event.sender.send(channels.GET_ALL_TOURNAMENTS, {
      tournaments: tournaments
    });
  });
});

ipcMain.on(channels.DELETE_TOURNAMENT, (event, data) => {
  const { id } = data;
  database.deleteTournament(id).then(() => {
    event.sender.send(channels.DELETE_TOURNAMENT);
  });
});

function getDirectoryFiles(directoryPath) {
  console.log("Load tournaments from directory:", directoryPath);
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    if (files.length === 0) {
      console.log("No tournaments found");
    }

    //listing all files using forEach
    files.forEach(function(file) {
      // Do whatever you want to do with the file
      console.log(file);
    });
  });
}
