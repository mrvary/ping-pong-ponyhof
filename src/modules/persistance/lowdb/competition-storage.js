/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const config = require("../../../electron/config");

let storage = null;

function open(filePath) {
  if (storage) {
    return;
  }

  const adapter = config.USE_IN_MEMORY_STORAGE
    ? new Memory()
    : new FileSync(filePath);
  storage = low(adapter);
}

function initWithCompetition(jsonObject) {
  storage.setState(jsonObject).write();
}

function createMatches(matches) {
  const elementPath = "matches";
  const hasMatchesFlag = storage.has(elementPath).value();

  if (!hasMatchesFlag) {
    storage.set(elementPath, matches).write();
  } else {
    matches.forEach(match => {
      storage
        .get(elementPath)
        .post(match)
        .write();
    });
  }
}

function getAllMatches() {
  const elementPath = "matches";
  return storage.get(elementPath).value();
}

function createPlayers(players) {
  const elementPath = "players";
  const hasMatchesFlag = storage.has(elementPath).value();

  if (!hasMatchesFlag) {
    storage.set(elementPath, players).write();
  } else {
    players.forEach(player => {
      storage
        .get(elementPath)
        .post(player)
        .write();
    });
  }
}

function getAllPlayers() {
  const elementPath = "players";
  return storage.get(elementPath).value();
}

function getMatchesByIds(ids) {
  const matches = getAllMatches();
  return matches.filter(match => ids.includes(match.id));
}

module.exports = {
  open,
  initWithCompetition,
  createMatches,
  getAllMatches,
  getMatchesByIds,
  createPlayers,
  getAllPlayers
};
