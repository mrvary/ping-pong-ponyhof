const { app } = require('electron');

const fs = require('fs');
const path = require('path');

function getDatabasePath() {
  // Get application path
  const userPath = app.getPath('userData');

  // Create database folder
  const dataDir = path.join(userPath, 'database');
  createDirectorySync(dataDir);

  // open database connection to file
  const dbPath = path.join(dataDir, 'database.db');

  return dbPath;
}

function createDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
}

module.exports = {
  getDatabasePath,
  createDirectorySync
};
