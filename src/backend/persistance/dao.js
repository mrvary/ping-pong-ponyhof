const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

let db = null;

// ':memory:'
function open(dbFilePath) {
  if (!dbFilePath) {
    return;
  }

  // open a database connection
  db = new sqlite3.Database(dbFilePath, err => {
    if (err) {
      console.log('Could not connect to database', err);
    } else {
      console.log('Connected to database');
    }
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    if (!db) {
      return;
    }

    db.run(sql, params, err => {
      if (err) {
        console.log('Error running sql ' + sql);
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    if (!db) {
      return;
    }

    db.get(sql, params, (err, result) => {
      if (err) {
        console.log('Error running sql: ', sql);
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
    if (!db) {
      return;
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.log('Error running sql: ', sql);
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = { open, run, get, all };
