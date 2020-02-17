/**
 * @author Marco Goebel
 */

const fileManager = require("../file-manager");

const tournamentRepository = require("./repositories/tournament-repository");

const { createTournamentFromJSON } = require("../../models/tournament");

function createTournamentDatabase() {
  // open database connection
  const filePath = fileManager.getTournamentDatabasePath();
  tournamentRepository.createFile(filePath);
}

function importJSONTournament(jsonObject) {
  // create a tournament object
  const tournament = createTournamentFromJSON(jsonObject.tournament);

  // create new file for tournament
  const jsonFilePath = fileManager.generateTournamentFileName(tournament);
  fileManager.createNewTournamentFile(jsonFilePath, jsonObject);

  // add new entriy into the tournaments json
  tournamentRepository.create(tournament);
}

module.exports = {
  createTournamentDatabase,
  importJSONTournament
};
