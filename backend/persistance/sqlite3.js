const { app } = require('electron');
const sqlite3 = require('sqlite3');

const path = require('path');
const fs = require('fs');

let db = null;

function createDatabase(inMemory) {
  if (inMemory) {
    db = new sqlite3.Database(':memory:');
    createSchemas();
    return;
  }

  // Get application path
  const userPath = app.getPath('userData');

  // Create database folder
  const dataDir = path.join(userPath, 'database');
  createDirectorySync(dataDir);

  const dbPath = path.join(dataDir, 'database.db');
  // Open existing database
  if (fs.existsSync(dbPath)) {
    db = new sqlite3.Database(dbPath);
    return;
  }

  // Create absolute new database
  db = new sqlite3.Database(dbPath);
  createSchemas();
}

function createDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
}

function createSchemas() {
  if (!db) {
    return;
  }

  db.serialize(() => {
    db.run('CREATE TABLE Products (name, barcode, quantity)');

    db.run('INSERT INTO Products VALUES (?, ?, ?)', [
      'product001',
      'xxxxx',
      20
    ]);
  });
}

function getAllProducts() {
  db.each('SELECT * FROM Products', (err, row) => {
    console.log(row);
  });
}

function close() {
  db.close();
}

module.exports = {
  createDatabase,
  getAllProducts,
  close
};
