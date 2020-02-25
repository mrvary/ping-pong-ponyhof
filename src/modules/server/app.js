/**
 * @author Marco Goebel
 */

const express = require("express");
const path = require("path");

// electron dependencies
const isDev = require("electron-is-dev");

// create a express application
const app = express();

if (isDev) {
  // redirect to the development server of the react client app
  app.get("*", (request, response) => {
    const clientUrl = process.env.CLIENT_START_URL || "http://localhost:3001";
    response.redirect(clientUrl);
  });
} else {
  // Serve the static files from the react client app
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

module.exports = app;
