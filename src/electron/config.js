/**
 * @author Marco Goebel
 */

require("dotenv").config();
const isDev = require("electron-is-dev");

const url = require("url");
const path = require("path");

const network = require("./helper/networkHelper");

// constants
const GITHUB_LINK = "https://github.com/mrvary/ping-pong-ponyhof";

// server config
const SERVER_HOST = isDev ? "localhost" : network.getIpAddress();
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;

// electron config
const ELECTRON_START_URL =
  process.env.ELECTRON_START_URL ||
  url.format({
    // important for deployment -> delete sub path "build"
    // -> https://stackoverflow.com/questions/41130993/electron-not-allowed-to-load-local-resource
    pathname: path.join(__dirname, "../../build/index.html"),
    protocol: "file:",
    slashes: true
  });

// lowDB config
const USE_IN_MEMORY_STORAGE = false;

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
  SERVER_URL,
  ELECTRON_START_URL,
  USE_IN_MEMORY_STORAGE,
  GITHUB_LINK
};
