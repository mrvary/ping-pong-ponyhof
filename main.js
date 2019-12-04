
require("dotenv").config();
require("electron-reload");

const electron = require("electron");
const log = require("electron-log");
const isDev = require("electron-is-dev");
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;

const server = require("./backend/server");

const path = require("path");
const fs = require("fs");

const parser = require("xml2json");

let win;
let webServer;

let players = [];

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, "build", "index.html")}`
  win.loadURL(startUrl);

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    win = null;
  });
}

ipc.on("open-client", event => {
  electron.shell.openExternal(`http://localhost:${SERVER_PORT}`);
});

ipc.on("close-application", event => {
  win.close();
});

ipc.on("open-import-dialog", event => {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "XML", extensions: ["xml"] }]
    })
    .then(result => {
      const content = fs.readFileSync(result.filePaths[0]);
      const json = JSON.parse(parser.toJson(content), {
        reversible: false
      });

      players = json.tournament.competition.players.player;
      event.sender.send("opened-import-dialog", players);
    });
});

app.on("ready", () => {
  webServer = server.createServer();
  createWindow();
});

app.on("before-quit", () => {
  log.info("gracefully shutting down...");
  if (webServer) {
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
  if (win === null) {
    createWindow();
  }
});
