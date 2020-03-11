/**
 * Helper that handles the file management with the electron application
 * @author Marco Goebel
 */

const { app } = require("electron");

const path = require("path");
const fs = require("fs");

const documentsFolderName = "documents";
const dataFolderName = "data";
const metaStorageFilename = "competitions.json";

function getApplicationDir(directoryName) {
  const appPath = app.getPath("userData");
  const appDataPath = path.join(appPath, directoryName);

  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath);
  }

  return appDataPath;
}

function getFileFromAppDataPath(filename) {
  const appDataPath = getApplicationDir(dataFolderName);
  return path.join(appDataPath, filename);
}

function getMetaStorageDatabasePath() {
  return getFileFromAppDataPath(metaStorageFilename);
}

function getCompetitionFilePath(id) {
  return getFileFromAppDataPath(`${id}.json`);
}

function getDefaultExportFilePath(filename) {
  const docDir = getApplicationDir(documentsFolderName);
  return path.join(docDir, filename);
}

function saveXMLFile(filePath, xmlContent) {
  try {
    fs.writeFileSync(filePath, xmlContent);
    console.log("Save XML:", filePath);
  } catch (err) {
    console.log(err);
  }
}

function deleteTournamentJSONFile(id) {
  const filePath = getCompetitionFilePath(id);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Delete competition JSON file:", filePath);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getMetaStorageDatabasePath,
  getCompetitionFilePath,
  getDefaultExportFilePath,

  saveXMLFile,
  deleteTournamentJSONFile
};
