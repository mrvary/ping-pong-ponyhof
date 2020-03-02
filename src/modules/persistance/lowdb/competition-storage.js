/**
 * @author Marco Goebel
 */

const lowDBDao = require("./dao/lowdb-dao");

// Error Messages
const FilePathIsUndefinedException = lowDBDao.FilePathIsUndefinedException;
const ERROR_MESSAGES = {
  FilePathIsUndefinedException
};

// Element Paths
const ELEMENT_PATHS = {
  MATCHES: "matches",
  PLAYERS: "players"
};

let internalFilePath;
let internalUseInMemory;

let storage = null;

// STATE OPERATIONS

function init(filePath, useInMemory = true) {
  internalFilePath = filePath;
  internalUseInMemory = useInMemory;

  if (storage) {
    return;
  }

  storage = lowDBDao.open(filePath, useInMemory);
}

function initStateWithDefaults(jsonObject) {
  lowDBDao.initStateWithDefaults(storage, jsonObject);
  lowDBDao.createElements(storage, ELEMENT_PATHS.MATCHES, []);
  lowDBDao.createElements(storage, ELEMENT_PATHS.PLAYERS, []);
}

function getState() {
  return lowDBDao.getState(storage);
}

function close() {
  if (storage) {
    storage = null;
  }
}

// CRUD MATCHES

function createMatches(matches) {
  lowDBDao.createElements(storage, ELEMENT_PATHS.MATCHES, matches);
}

function createMatch(match) {
  lowDBDao.createElement(storage, ELEMENT_PATHS.MATCHES, match);
}

function updateMatch(match) {
  const identifier = { id: match.id };

  const storedMatch = lowDBDao.getElement(
    storage,
    ELEMENT_PATHS.MATCHES,
    identifier
  );

  if (!storedMatch) {
    createMatch(match);
    return;
  }

  lowDBDao.updateElement(storage, ELEMENT_PATHS.MATCHES, match, identifier);
}

function getAllMatches() {
  return lowDBDao.getAllElements(storage, ELEMENT_PATHS.MATCHES);
}

function getMatchesByIds(ids) {
  const matches = lowDBDao.getAllElements(storage, ELEMENT_PATHS.MATCHES);
  return matches.filter(match => ids.includes(match.id));
}

// PLAYER CRUD

function createPlayers(players) {
  lowDBDao.createElements(storage, ELEMENT_PATHS.PLAYERS, players);
}

function getAllPlayers() {
  return lowDBDao.getAllElements(storage, ELEMENT_PATHS.PLAYERS);
}

module.exports = {
  ERROR_MESSAGES,

  init,
  initStateWithDefaults,
  getState,
  close,

  createMatches,
  updateMatch,
  getMatchesByIds,

  createPlayers,
  getAllPlayers
};
