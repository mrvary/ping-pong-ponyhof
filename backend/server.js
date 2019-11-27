const express = require("express");
const socket = require("socket.io");
const isDev = require("electron-is-dev");
const path = require("path");
const log = require("electron-log");

const PORT = 4000;

function createServer() {
  const serverApp = express();

  if (isDev) {
    serverApp.get("/", (request, response) => {
      response.redirect("http://localhost:8000");
    });
  } else {
    serverApp.use(express.static(path.join(__dirname, "client", "build")));
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
}

module.exports = {
  createServer
};
