const { app } = require('electron');
const sqlite3 = require('sqlite3');

const path = require('path');
const fs = require('fs');

const dirHelper = require('../utils/directory-helper');

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
  dirHelper.createDirectorySync(dataDir);

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

function createSchemas() {
  if (!db) {
    return;
  }

  db.serialize(() => {
    db.run(
      'CREATE TABLE tournaments (tournament_id, name, city, start_date, end_date)'
    );
    db.run(
      'CREATE TABLE competitions (competition_id, playmode, age_group, type, start_date, tournament_id)'
    );
    db.run(
      'CREATE TABLE matches (match_id, player1_id, player2_id, competition_id)'
    );
    db.run('CREATE TABLE players (player_id, type)');
    db.run(
      'CREATE TABLE persons (person_id, firstname, lastname, TTR, internal_nr, player_id)'
    );
  });
}

function importJSON(json) {
  const tournament = {
    tournament_id: json.tournament["tournament-id"],
    name: json.tournament["name"],
    city: json.tournament["tournament-location"].city,
    start_date: json.tournament["start-date"],
    end_date: json.tournament["end-date"]
  };

  console.log(tournament);

  addTournament(tournament);
}

function addTournament(tournament) {
  db.serialize(() => {
    db.run(
      'INSERT INTO tournaments (tournament_id, name, city, start_date, end_date) VALUES (?,?,?,?,?)',
      [
        tournament.tournament_id,
        tournament.name,
        tournament.city,
        tournament.start_date,
        tournament.end_date
      ]
    );
  });
}

function getAllTournaments() {
  db.each('SELECT * FROM tournaments', (err, row) => {
    console.log(row);
  });
}

function close() {
  db.close();
}

module.exports = {
  createDatabase,
  importJSON,
  getAllTournaments,
  close
};
