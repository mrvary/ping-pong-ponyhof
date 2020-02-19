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

function getFileFromAppDataPath(filename) {
  const appDataPath = getApplicationDir("data");
  return path.join(appDataPath, filename);
}

function getCompetitionDatabasePath() {
  return getFileFromAppDataPath("competitions.json")
}

function getCompetitionFilePath(id) {
  return getFileFromAppDataPath(`${id}.json`);
}

/**
 * Convert from json object to json plain text and store file
 */
 function createTournamentJSONFile(id, jsonObject) {
  const filepath = getCompetitionFilePath(id);

  const data = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(filepath, data);
  console.log("Create new tournament JSON file:", filepath);
}

function deleteTournamentJSONFile(id) {
  const filePath = getCompetitionFilePath(id);

  fs.unlinkSync(filePath);
  console.log("Delete tournament JSON file:", filePath);
}

module.exports = {
  getCompetitionFilePath,
  getCompetitionDatabasePath,
  createTournamentJSONFile,
  deleteTournamentJSONFile
};
