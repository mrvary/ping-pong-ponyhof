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

function generateTournamentFileName(tournament) {
  const appDataPath = getApplicationDir("data");
  const filename = `${tournament.id}.json`;
  return path.join(appDataPath, filename);
}

function getDirectoryFiles(directoryPath) {
  console.log("Load tournaments from directory:", directoryPath);
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    if (files.length === 0) {
      console.log("No tournaments found");
    }

    //listing all files using forEach
    files.forEach(function(file) {
      // Do whatever you want to do with the file
      console.log(file);
    });

    return files;
  });
}

/**
 * Convert from json object to json plain text and store file
 * */
function createNewTournamentFile(filepath, jsonObject) {
  const data = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(filepath, data);
  console.log("Create new tournament file:", filepath);
}

module.exports = {
  generateTournamentFileName,
  getApplicationDir,
  getDatabasePath,
  getTournamentDatabasePath,
  getDirectoryFiles,
  createNewTournamentFile
};
