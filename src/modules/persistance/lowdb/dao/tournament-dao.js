/**
 * @author Marco Goebel
 */

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

let db = null;

function open(filePath) {
  console.log(`lowdb: Open connection to file "${filePath}"`);

  const adapters = new FileSync(filePath);
  db = low(adapters);

  // init db with default structure
  db.defaults({ tournaments: [] }).write();
}

function create(tournament) {
  db.get("tournaments")
    .push(tournament)
    .write();
  console.log(`Created tournament: ${tournament.id}`);
}

function remove(tournament) {
  db.remove(tournament).write();
}

function getAll() {
  return db.get("tournaments");
}

function get(id) {
  return db
    .get("tournaments")
    .find({ id: id })
    .value();
}

module.exports = { open, create, remove, getAll, get };
