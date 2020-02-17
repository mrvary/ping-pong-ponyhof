const { app } = require("electron");

const path = require("path");
const fs = require("fs");

const tournamentService = require("./lowdb/tournament-service");
const { createTournamentFromJSON } = require("../models/tournament");

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

function createTournamentMetaData() {
  const dataDir = getApplicationDir("data");
  const dbFilePath = path.join(dataDir, "tournaments.json");

  tournamentService.createTournamentMetaFile(dbFilePath);
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

function createNewTournamentFile(jsonObject) {
  const tournament = createTournamentFromJSON(jsonObject.tournament);

  // create full file path
  const appDataPath = getApplicationDir("data");
  const filename = `${tournament.id}.json`;
  const jsonFilePath = path.join(appDataPath, filename);

  // convert from json object to json plain text and store file
  const data = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(jsonFilePath, data);

  // add new entriy into the tournaments json
  tournamentService.addTournamentFile(tournament);
}

module.exports = {
  createTournamentMetaData,
  getApplicationDir,
  getDatabasePath,
  getDirectoryFiles,
  createNewTournamentFile
};
