const Promise = require("bluebird");

const tournamentRepo = require("./repositories/tournament-repository");
const competitionRepo = require("./repositories/competition-repository");
const competitionPersonRepo = require("./repositories/competiton-person-repository");
const personRepo = require("./repositories/person-repository");
const matchRepo = require("./repositories/match-repository");
const dao = require("./repositories/dao/dao");

async function createDatabase(dbFilePath) {
  // open database connection
  dao.open(dbFilePath);

  try {
    // create database schemas
    await tournamentRepo.createTable(dao);
    console.log("Create table tournaments");

    await competitionRepo.createTable(dao);
    console.log("Create table competitions");

    await personRepo.createTable(dao);
    console.log("Create table persons");

    await competitionPersonRepo.createTable(dao);
    console.log("Create table competition_person");

    await matchRepo.createTable(dao);
    console.log("Create table matches");
  } catch (error) {
    console.log("Error: ", error);
  }
}

/** Import from JSON */

function importTournamentFromJSON(jsonTournament) {
  const tournament = {
    id: jsonTournament["tournament-id"],
    name: jsonTournament["name"],
    city: jsonTournament["tournament-location"].city,
    start_date: jsonTournament["start-date"],
    end_date: jsonTournament["end-date"]
  };

  tournamentRepo.create(dao, tournament);
  console.log("Create a new tournament");

  return tournament.id;
}

async function importCompetitionFromJSON(jsonCompetition, tournament_id) {
  const competition = {
    playmode: jsonCompetition["preliminary-round-playmode"],
    age_group: jsonCompetition["age-group"],
    type: jsonCompetition["type"],
    start_date: jsonCompetition["start-date"]
  };

  const id = await competitionRepo.create(dao, competition, tournament_id);
  console.log("Create a new competition");
  console.log(id);

  return id;
}

function importFromJSON(json) {
  const tournamentId = importTournamentFromJSON(json.tournament);
  importCompetitionFromJSON(json.tournament.competition, tournamentId);
}

//** Tournaments */

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

/** Competitions */

function getCompetitonByTournamentId(tournament_id) {
  return competitionRepo.getCompetitionsByTournamentId(tournament_id);
}

module.exports = {
  createDatabase,
  importFromJSON,
  getAllTournaments,
  deleteTournament
};
