const express = require("express");
const socket = require("socket.io");

const isDev = require("electron-is-dev");
const log = require("electron-log");

const path = require("path");

const PORT = 4000;
let deviceNumbers = new Map();
let io = null;

function createServer() {
  const serverApp = express();

  if (!isDev) {
    // Serve the static files from the React app
    serverApp.use(express.static(path.join(__dirname, "../client/build")));

    // Handles any requests that don't match the ones above
    serverApp.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  } else {
    serverApp.get("*", (request, response) => {
      const clientUrl = process.env.CLIENT_START_URL || "http://localhost:3001";
      response.redirect(clientUrl);
    });
  }

  // Create web server
  let server = serverApp.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
  });

  if (!server) {
    log.info("Could not start web server");
  }

  // socket io setup
  io = socket(server);

  // event fired every time a new client connects:
  io.on("connection", client => {
    console.info(`Client connected [id=${client.id}]`);
    var addedDevice = false;

    client.on("add-device", data => {
      const { tableNumber } = data;

      const keyExists = deviceNumbers.has(tableNumber);
      if (keyExists) {
        client.emit("login-error", data);
        return;
      }

      deviceNumbers.set(tableNumber, client.id);
      addedDevice = true;
      console.info(`Client login [id=${client.id}] [table=${tableNumber}]`);

      client.emit("login", data);
    });

    // Funktion, die darauf reagiert, wenn ein Benutzer eine Nachricht schickt
    client.on("new-message", data => {
      // Sende die Nachricht an alle Clients
      console.log(`${client.username} -> ${data}`);
    });

    // when socket disconnects, remove it from the list
    client.on("disconnect", (data) => {
      if (addedDevice) {
        deviceNumbers.delete(1);
        console.info(`Client logout [id=${client.id}]`);
      }
      console.log(`Client gone [id=${client.id}]`);
    });
  });

  return server;
}

function sendBroadcast(eventName) {
  if (io) {
    io.sockets.emit(eventName);
    console.log('server start round')
  }
}

module.exports = {
  SERVER_PORT: PORT,
  createServer,
  sendBroadcast
};
