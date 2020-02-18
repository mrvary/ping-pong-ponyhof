/**
 * @author Marco Goebel
 */

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

let db = null;

function open(filePath) {
  const adapters = new FileSync(filePath);
  db = low(adapters);
  console.log("Connected to database:", filePath);

  // init db with default structure
  db.defaults({ tournaments: [] }).write();
  console.log("Create tournaments table");
}

function create(tournament) {
  db.get("tournaments")
    .push(tournament)
    .write();
  console.log(`Created new tournament: ${tournament.id}`);
}

function remove(id) {
  db.get("tournaments").remove({id: id}).write();
  console.log("Delete tournament with id: ", id);
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
