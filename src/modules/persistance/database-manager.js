/**
 * Helper that handles the the lowDB initialization and the file management
 * @author Marco Goebel
 */

const fileManager = require("./file-manager");

// lowDB storage
const metaStorage = require("./lowdb/meta-storage");
const competitionStorage = require("./lowdb/competition-storage");

// repositories
const metaRepository = require("./repositories/meta-repository");
const playerRepository = require("./repositories/player-repository");
const matchRepository = require("./repositories/match-repository");

function initMetaRepository(useInMemory) {
  // init meta storage
  const filePath = fileManager.getMetaStorageDatabasePath();
  metaStorage.init(filePath, useInMemory);
  metaStorage.initStateWithDefaults({ competitions: [] });

  // init meta repository
  metaRepository.init(metaStorage);
}

function initCompetitionStorage(competitionId, useInMemory, jsonObject) {
  const filePath = fileManager.getCompetitionFilePath(competitionId);
  competitionStorage.init(filePath, useInMemory);

  if (jsonObject) {
    competitionStorage.initStateWithDefaults(jsonObject);
    console.log("Initialized competition storage with json object");
  }

  initPlayerRepository();
  initMatchRepository();
}

function deleteCompetitionStorage(competitionId) {
  // Close connection of competition storage
  competitionStorage.close();

  // Delete the competition file
  fileManager.deleteTournamentJSONFile(competitionId);

  // Delete competition from meta file
  metaRepository.deleteCompetition(competitionId);
}

function getImportedJSONObject() {
  return competitionStorage.getImportedData();
}

function getMetaRepository() {
  return metaRepository;
}

function getPlayerRepository() {
  return playerRepository;
}

function getMatchRepository() {
  return matchRepository;
}

function initPlayerRepository() {
  if (!competitionStorage.isInitialized()) {
    // TODO: throw exception
    console.log("The competition storage is not initialized");
  }

  playerRepository.init(competitionStorage);
}

function initMatchRepository() {
  if (!competitionStorage.isInitialized()) {
    // TODO: throw exception
    console.log("The competition storage is not initialized");
  }

  matchRepository.init(competitionStorage);

  return matchRepository;
}

module.exports = {
  initMetaRepository,

  initCompetitionStorage,
  deleteCompetitionStorage,

  getImportedJSONObject,
  getMetaRepository,
  getPlayerRepository,
  getMatchRepository
};
