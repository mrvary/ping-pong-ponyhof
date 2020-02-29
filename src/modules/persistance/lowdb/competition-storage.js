/**
 * @author Marco Goebel
 */

const lowDBDao = require("./dao/lowdb-dao");

// Error Messages
const FilePathIsUndefinedException = lowDBDao.FilePathIsUndefinedException;
const COMP_ERROR_MESSAGES = {
  FilePathIsUndefinedException
};

// Element Paths
const ELEMENT_PATHS = {
  MATCHES: "matches",
  PLAYERS: "players"
};

let internalFilePath;
let internalUseInMemory;

// STATE OPERATIONS

function init(filePath, useInMemory = true) {
  internalFilePath = filePath;
  internalUseInMemory = useInMemory;
}

function initStateWithDefaults(jsonObject) {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  lowDBDao.initStateWithDefaults(jsonObject);
  lowDBDao.createElements(ELEMENT_PATHS.MATCHES, []);
  lowDBDao.createElements(ELEMENT_PATHS.PLAYERS, []);
}

function getState() {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  return lowDBDao.getState();
}

function close() {
  lowDBDao.close();
}

// CRUD MATCHES

function createMatches(matches) {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  lowDBDao.createElements(ELEMENT_PATHS.MATCHES, matches);
}

function getAllMatches() {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  return lowDBDao.getAllElements(ELEMENT_PATHS.MATCHES);
}

function getMatchesByIds(ids) {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  const matches = lowDBDao.getAllElements(ELEMENT_PATHS.MATCHES);
  return matches.filter(match => ids.includes(match.id));
}

// PLAYER CRUD

function createPlayers(players) {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  lowDBDao.createElements(ELEMENT_PATHS.PLAYERS, players);
}

function getAllPlayers() {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  return lowDBDao.getAllElements(ELEMENT_PATHS.PLAYERS);
}

module.exports = {
  COMP_ERROR_MESSAGES,

  init,
  initStateWithDefaults,
  getState,
  close,

  createMatches,
  getAllMatches,
  getMatchesByIds,

  createPlayers,
  getAllPlayers
};
