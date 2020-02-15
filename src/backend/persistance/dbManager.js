const Promise = require("bluebird");

const tournamentRepo = require("./repositories/tournament-repository");
const competitionRepo = require("./repositories/competition-repository");
const competitionPersonRepo = require("./repositories/competiton-person-repository");
const personRepo = require("./repositories/person-repository");

const dao = require("./repositories/dao/dao");

let dbFilePath = null;

function createDatabase(dbFilePath) {
  this.dbFilePath = dbFilePath;

  // open database connection
  dao.open(dbFilePath);

  // create database schemas
  tournamentRepo
    .createTable(dao)
    .then(() => {
      console.log("Create table tournaments");
      competitionRepo.createTable(dao).then(() => {
        console.log("Create table competitions");
        personRepo.createTable(dao).then(() => {
          console.log("Create table persons");
          competitionPersonRepo.createTable(dao).then(() => {
            console.log("Create table competition_person");
          });
        });
      });
    })
    .catch(err => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });

  // 'CREATE TABLE matches (match_id, player1_id, player2_id, competition_id)'
  // 'CREATE TABLE players (player_id, type)'
  // 'CREATE TABLE persons (person_id, firstname, lastname, TTR, internal_nr, player_id)'
}

function importFromJSON(json) {
  // create tournament in database
  const tournament = {
    tournament_id: json.tournament["tournament-id"],
    name: json.tournament["name"],
    city: json.tournament["tournament-location"].city,
    start_date: json.tournament["start-date"],
    end_date: json.tournament["end-date"]
  };
  tournamentRepo.create(dao, tournament);
  console.log("Create new tournament");

  // create competitions in database
  const competition = {
    playmode: json.tournament.competition["preliminary-round-playmode"],
    age_group: json.tournament.competition["age-group"],
    type: json.tournament.competition["type"],
    start_date: json.tournament.competition["start-date"],
    tournament_id: tournament.tournament_id
  };

  competitionRepo.create(dao, competition, tournament.tournament_id);
  console.log("Create a new competition");
}

function getAllTournaments() {
  return tournamentRepo
    .getAll(dao)
    .then(tournaments => {
      console.log("Retrieved tournaments from database");
      return new Promise((resolve, reject) => {
        tournaments.forEach(tournament => {
          console.log(`tournament id = ${tournament.id}`);
          console.log(`tournament name = ${tournament.name}`);
          console.log(`tournament city = ${tournament.city}`);
          console.log(`tournament start-date = ${tournament.start_date}`);
          console.log(`tournament end-date = ${tournament.end_date}`);
        });
        resolve(tournaments);
      });
    })
    .catch(err => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
}

function deleteTournament(id) {
  return tournamentRepo
    .remove(dao, id)
    .then(() => {
      console.log("Delete tournament with id: ", id);
    })
    .catch(err => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
}

module.exports = {
  createDatabase,
  importFromJSON,
  getAllTournaments,
  deleteTournament
};
