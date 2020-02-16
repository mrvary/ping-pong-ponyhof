/**
 * @author Marco Goebel
 */

const Promise = require("bluebird");

// repositories
const tournamentRepo = require("./repositories/tournament-repository");
const competitionRepo = require("./repositories/competition-repository");
const competitionPersonRepo = require("./repositories/competiton-person-repository");
const personRepo = require("./repositories/person-repository");
const matchRepo = require("./repositories/match-repository");

// model functions
const { createTournamentFromJSON } = require("./models/tournament");
const { createCompetitionFromJSON } = require("./models/competition");

// dao
const dao = require("./dao/dao");

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
//** Tournaments */

function importJSONTournament(jsonObject) {
  // import tournament object
  const tournament = createTournamentFromJSON(jsonObject.tournament);
  const tournamentId = createTournament(tournament);

  // import competition object
  const competition = createCompetitionFromJSON(
    jsonObject.tournament.competition
  );
  competition.tournamentId = tournament.id;
  const competitionId = createCompetition(competition);
}

function createTournament(tournament) {
  tournamentRepo.create(dao, tournament).then(data => {
    console.log("Create new tournament: ", data);
    return data;
  });
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

/** Competitions */

function createCompetition(competition) {
  competitionRepo.create(dao, competition).then(data => {
    console.log("Create new competition: ", data);
    return data;
  });
}

function getCompetitonByTournamentId(tournament_id) {
  return competitionRepo.getCompetitionsByTournamentId(tournament_id);
}

module.exports = {
  createDatabase,

  importJSONTournament,

  getAllTournaments,
  deleteTournament,

  getCompetitonByTournamentId
};
