/**
 * @author Marco Goebel
 */

const sqlite3 = require("sqlite3").verbose();
const Promise = require("bluebird");

let db = null;

// open a database connection
function open(dbFilePath) {
  this.db = new sqlite3.Database(dbFilePath, err => {
    if (err) {
      console.error("Could not connect to database", err.message);
    } else {
      console.log(`Connected to database:`, dbFilePath);
    }
  });
}

// close the database connection
function close() {
  if (!this.db) {
    return;
  }

  this.db.close(err => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Close the database connection");
    }
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.db.run(sql, params, err => {
      if (err) {
        console.log("Error running SQL-Statement:", sql);
        console.log(err);
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.db.get(sql, params, (err, result) => {
      if (err) {
        console.log("Error running sql: ", sql);
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.db.all(sql, params, (err, rows) => {
      if (err) {
        console.log("Error running sql: ", sql);
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = { open, close, run, get, all };
