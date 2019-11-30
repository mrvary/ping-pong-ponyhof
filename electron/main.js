require("dotenv").config();
require("electron-reload");

const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const { channels } = require("../src/shared/channels");
const log = require("electron-log");
const isDev = require("electron-is-dev");

const express = require("express");
const socket = require("socket.io");
const http = require("http");

const path = require("path");
const url = require("url");
const fs = require("fs");

const parser = require("xml2json");

// Start script
const SERVER_PORT = 4000;

let mainWindow;
let webServer;

let players = [];

function startExpressServer() {
  const serverApp = express();

  // Define Routes
  serverApp.get("/players", (request, response) => {
    if (players.length > 0) {
      response.send(players);
      return;
    }

    response.send("not players yet.");
  });

  if (!isDev) {
    // Serve the static files from the React app
    serverApp.use(express.static(path.join(__dirname, "../client/build")));

    // Handles any requests that don't match the ones above
    serverApp.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../server/build/index.html"));
    });
  } else {
    serverApp.get("*", (request, response) => {
      const clientUrl = process.env.CLIENT_START_URL || 'http://localhost:3001'
      response.redirect(clientUrl);
    });
  }

  // Create web server
  webServer = http.createServer(serverApp);
  webServer.listen(SERVER_PORT, () => {
    log.info(`Server is running on port ${SERVER_PORT}`);
  });

  if (!webServer) {
    log.info("Could not start web server");
  }

  // Socket setup
  const io = socket(webServer);
  io.on("connection", socket => {
    log.info("a user connected", socket.id);
  });
}

function createWindow() {
  // important for deployment -> delete sub path "build" 
  // -> https://stackoverflow.com/questions/41130993/electron-not-allowed-to-load-local-resource
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  startExpressServer();
  createWindow();
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
    createWindow();
  }
});

ipcMain.on(channels.OPEN_CLIENT, event => {
  shell.openExternal(`http://localhost:${SERVER_PORT}`);
});

ipcMain.on(channels.OPEN_IMPORT_DIALOG, event => {
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
