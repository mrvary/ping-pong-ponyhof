const electron = require("electron");
const log = require("electron-log");
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;

const express = require("express");
const socket = require("socket.io");
const http = require("http");

const path = require("path");
const url = require("url");
const fs = require("fs");

const parser = require("xml2json");

const PORT = 4000;

let win;
let webServer;

let players = [];

function startExpressServer() {
  // App setup
  const serverApp = express();

  // Static files
  serverApp.use(express.static(path.join(__dirname, "client", "build")));

  // Define Routes
  serverApp.get("/players", (request, response) => {
    if (players.length > 0) {
      response.send(players);
      return;
    }

    response.send("not players yet.");
  });

  // Create web server
  webServer = http.createServer(serverApp);
  webServer.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
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
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./frontend/index.html"),
      protocol: "file",
      slashes: true
    })
  );

  win.on("closed", () => {
    win = null;
  });
}

ipc.on("open-client", event => {
  electron.shell.openExternal(`http://localhost:${PORT}`);
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
  startExpressServer();
  createWindow();
});

app.on("before-quit", () => {
  log.info("gracefully shutting down...");
  webServer.kill();
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
