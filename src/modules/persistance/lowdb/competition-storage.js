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
  if (internalFilePath !== filePath) {
    close();
  }

  if (storage) {
    return;
  }

  internalFilePath = filePath;
  internalUseInMemory = useInMemory;

  storage = lowDBDao.open(filePath, useInMemory);
}

function isInitialized() {
  return !!storage;
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
    console.log("close current competition storage");
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

function updatePlayers(players) {
  players.forEach(player => updatePlayer(player));
}

function updatePlayer(player) {
  const identifier = { id: player.id };

  const storedPlayer = lowDBDao.getElement(
    storage,
    ELEMENT_PATHS.PLAYERS,
    identifier
  );

  if (!storedPlayer) {
    createPlayers(player);
    return;
  }

  lowDBDao.updateElement(storage, ELEMENT_PATHS.PLAYERS, player, identifier);
}

function getAllPlayers() {
  const players = lowDBDao.getAllElements(storage, ELEMENT_PATHS.PLAYERS);
  console.log(players);
  console.log(`Get ${players.length} players from storage`);
  return players;
}

function getPlayer(id) {
  return lowDBDao.getElement(storage, ELEMENT_PATHS.PLAYERS, { id: id });
}

module.exports = {
  ERROR_MESSAGES,

  init,
  isInitialized,
  initStateWithDefaults,
  getState,
  close,

  createMatches,
  updateMatch,
  getAllMatches,
  getMatchesByIds,

  createPlayers,
  updatePlayers,
  updatePlayer,
  getAllPlayers,
  getPlayer
};
