/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

let storage = null;

function open(filePath, useInMemory) {
  if (storage) {
    return;
  }

  const adapter = useInMemory ? new Memory() : new FileSync(filePath);
  storage = low(adapter);

  console.log("Open storage:", filePath);
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
