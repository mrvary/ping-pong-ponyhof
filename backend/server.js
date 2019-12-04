const express = require("express");
const socket = require("socket.io");
const isDev = require("electron-is-dev");
const path = require("path");
const log = require("electron-log");

const PORT = 4000;

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
      const clientUrl = process.env.CLIENT_START_URL || 'http://localhost:3001';
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

  // Socket setup
  const io = socket(server);
  io.on("connection", socket => {
    log.info("a user connected", socket.id);
  });

  return server;
}

module.exports = {
  SERVER_PORT: PORT,
  createServer
};
