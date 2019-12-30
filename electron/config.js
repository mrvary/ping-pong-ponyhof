require('dotenv').config();
const isDev = require('electron-is-dev');

const url = require('url');
const path = require('path');

const network = require('../backend/network');

// server config
const SERVER_HOST = isDev ? 'localhost' : network.getIpAddress();
const SERVER_PORT = process.env.SERVER_PORT || 4000;

// electron config
const ELECTRON_START_URL  =
  process.env.ELECTRON_START_URL ||
  url.format({
    // important for deployment -> delete sub path "build"
    // -> https://stackoverflow.com/questions/41130993/electron-not-allowed-to-load-local-resource
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
  ELECTRON_START_URL 
};
