const express = require("express");
const io = require("socket.io");

const isDev = require("electron-is-dev");
const log = require("electron-log");

const path = require("path");

const PORT = 4000;
let serverSocket = null;
let connectedClients = new Map();

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
    return null;
  }

  setupSocketIO(server);

  return server;
}

function setupSocketIO(server) {
  // open server socket 
  serverSocket = io(server);

  // event fired every time a new client connects (Browser window was opened)
  serverSocket.on("connection", clientSocket => {
    var addedDevice = false;
    console.info(`Client connected [id=${clientSocket.id}]`);

    // event fired every time a client sends a table number
    clientSocket.on("add-device", data => {
      const { tableNumber } = data;

      // verify if a client is already connected to a table 
      const keyExists = connectedClients.has(tableNumber);
      if (keyExists) {
        clientSocket.emit("login-error", data);
        return;
      }

      // add client to connection list
      connectedClients.set(tableNumber, clientSocket.id);
      addedDevice = true;
      console.info(`Client login [id=${clientSocket.id}] [table=${tableNumber}]`);

      // send data to client
      clientSocket.emit("login", data);
    });

    // event fired when the client sends a message
    clientSocket.on("new-message", data => {
      console.log(`${clientSocket.id} -> ${data}`);
    });

    // event fired when a client disconnects, remove it from the list
    clientSocket.on("disconnect", (data) => {
      if (addedDevice) {
        connectedClients.delete(1);
        console.info(`Client logout [id=${clientSocket.id}]`);
      }
      console.log(`Client gone [id=${clientSocket.id}]`);
    });
  });
}

// this method is used to submit a broadcast event to all clients 
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
