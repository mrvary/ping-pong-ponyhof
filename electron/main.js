// node dependencies
const path = require("path");

// electron dependencies
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const log = require("electron-log");
const isDev = require("electron-is-dev");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

const config = require("./config");
const uiActions = require("./actions/uiActions");
const menu = require("./menu/main-menu");

// server dependencies
const server = require("../backend/server");

// matchmaker
const { createPlayersFromJSON } = require('../src/matchmaker/player');

// frontend dependencies
const { channels } = require("../src/shared/channels");

let mainWindow;
let webServer;

function createMainWindow() {
  // create the browser window ...
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../assets/icons/png/icon_16x16.png"),
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

  // Open the DevTools
  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // set custom application menu
  Menu.setApplicationMenu(menu);
}

app.on("ready", () => {
  // start web server
  const port = config.SERVER_PORT;
  webServer = server.createServer(port);

  if (!webServer) {
    log.info("Could not start web server");
    return;
  }

  // open the main window
  createMainWindow();
});

app.on("before-quit", () => {
  if (webServer) {
    log.info("gracefully shutting down...");
    webServer.kill();
    webServer = null;
  }
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
  uiActions.openXMLFile(json => {
    console.log(json);

    const players = createPlayersFromJSON(json);
    server.diceMatches(players);

    // notify main window
    event.sender.send(channels.FILE_IMPORTED, {
      players: json.tournament.competition.players.player
    });
  });
});
