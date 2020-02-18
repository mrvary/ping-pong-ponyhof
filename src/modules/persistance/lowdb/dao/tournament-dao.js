/**
 * @author Marco Goebel
 */

const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

let db = null;

function open(filePath) {
  console.log("Connected to database:", filePath);
  const adapters = new FileAsync(filePath);
  low(adapters).then(file => {
    db = file;

    // Set default values (required if your JSON file is empty)
    db.defaults({tournaments: []}).write().then(() => {
      console.log("Create tournaments table")
    });
  });
}

function create(tournament) {
  return db.get("tournaments")
      .push(tournament)
      .write();
}

function remove(id) {
  return db.get("tournaments").remove({id: id}).write();
}

function getAll() {
  return db.get("tournaments").value();
}

function get(id) {
  return db
      .get("tournaments")
      .find({id: id})
      .value();
}

module.exports = { open, create, remove, getAll, get };
