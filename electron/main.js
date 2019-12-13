// electron dependencies
const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
require('electron-reload');
const log = require('electron-log');
const isDev = require('electron-is-dev');

// server dependencies
const server = require('../backend/server');

// frontend dependencies
const { channels } = require('../src/shared/channels');

// node dependencies
const path = require('path');
const url = require('url');
const fs = require('fs');

// external package dependencies
const parser = require('xml2json');

let mainWindow;
let webServer;

let players = [];

function createWindow() {
  // important for deployment -> delete sub path "build"
  // -> https://stackoverflow.com/questions/41130993/electron-not-allowed-to-load-local-resource
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadURL(startUrl);
  // react dev tools for electron
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  webServer = server.createServer();
  createWindow();
});

app.on('before-quit', () => {
  if (webServer) {
    log.info('gracefully shutting down...');
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

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.OPEN_CLIENT, event => {
  shell.openExternal(`http://localhost:${server.SERVER_PORT}`);
});

ipcMain.on(channels.START_ROUND, event => {
  server.sendStartRoundBroadcast();
});

ipcMain.on(channels.OPEN_IMPORT_DIALOG, event => {
  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'XML', extensions: ['xml'] }]
    })
    .then(result => {
      const content = fs.readFileSync(result.filePaths[0]);
      const json = JSON.parse(parser.toJson(content), {
        reversible: false
      });

      players = json.tournament.competition.players.player;
      event.sender.send(channels.OPEN_IMPORT_DIALOG, {
        players: players
      });
    });
});

ipcMain.on(channels.APP_CLOSE, event => {
  if (mainWindow !== null) {
    mainWindow.close();
    mainWindow = null;
  }
});
