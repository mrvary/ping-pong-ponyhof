const { app } = require("electron");

const path = require("path");
const fs = require("fs");

function getApplicationDir(directoryName) {
  const appPath = app.getPath("userData");
  const appDataPath = path.join(appPath, directoryName);

  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath);
  }

  return appDataPath;
}

function getDatabasePath() {
  const databaseDir = getApplicationDir("database");
  return path.join(databaseDir, "database.db");
}

function getTournamentDatabasePath() {
  const dataDir = getApplicationDir("data");
  return path.join(dataDir, "tournaments.json");
}

function generateTournamentFileName(id) {
  const appDataPath = getApplicationDir("data");
  const filename = `${id}.json`;
  return path.join(appDataPath, filename);
}

/**
 * Convert from json object to json plain text and store file
 */
 function createTournamentFile(id, jsonObject) {
  const filepath = generateTournamentFileName(id);

  const data = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(filepath, data);
  console.log("Create new tournament file:", filepath);
}

function deleteTournamentFile(id) {
  const filePath = generateTournamentFileName(id);

  fs.unlinkSync(filePath);
  console.log("Delete file:", filePath);
}

module.exports = {
  generateTournamentFileName,
  getDatabasePath,
  getTournamentDatabasePath,
  createTournamentFile,
  deleteTournamentFile
};
