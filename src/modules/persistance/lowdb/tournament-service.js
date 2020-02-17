/**
 * @author Marco Goebel
 */

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

let db = null;

function createTournamentMetaFile(dbFilePath) {
  console.log("Open connection to file: ", dbFilePath);
  const adapters = new FileSync(dbFilePath);
  this.db = low(adapters);

  // init tournaments with default values
  this.db.defaults({ tournaments: [] }).write();
}

function addTournamentFile(tournament) {
  const tournaments = this.db.get('tournaments');
  tournaments.push(tournament).write();
}

function getTournaments() {
  return db.get("tournaments");
}

function save() {
  db.write().then(() => console.log("State has been saved"));
}

module.exports = {
  createTournamentMetaFile,
  addTournamentFile,
  getTournaments,
  save
};
