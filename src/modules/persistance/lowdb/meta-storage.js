/**
 * @author Marco Goebel
 */

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const DEFAULT_STATE = { competitions: [] };
const ELEMENT_PATHS = { Competitions: "competitions" };
const ERROR_MESSAGES = {
  Error1: "file path is not defined",
  Error2: "competition already exits"
};

let storage = null;

function open(filePath, useInMemory) {
  if (storage) {
    return;
  }

  if (!useInMemory && !filePath) {
    throw new Error(ERROR_MESSAGES.Error1);
  }

  const adapter = useInMemory ? new Memory() : new FileSync(filePath);
  storage = low(adapter);

  // Set default values (required if your JSON file is empty)
  storage.defaults({ competitions: [] }).write();
  console.log("Open storage:", filePath);
}

function clear() {
  storage.setState({ competitions: [] }).write();
}

function getState() {
  return storage.getState();
}

function createCompetition(competition) {
  if (hasCompetition(competition.id)) {
    throw new Error(ERROR_MESSAGES.Error2);
  }

  storage
    .get(ELEMENT_PATHS.Competitions)
    .push(competition)
    .write();

  console.log(`Created new competition: ${competition.id}`);
}

function updateCompetition(competition) {
  const storedCompetition = getCompetition(competition.id);

  if (!storedCompetition) {
    createCompetition(competition);
    return;
  }

  storage
    .get(ELEMENT_PATHS.Competitions)
    .find({ id: competition.id })
    .assign(competition)
    .write();

  console.log(`Updated competition: ${competition.id}`);
}

function deleteCompetition(id) {
  storage
    .get(ELEMENT_PATHS.Competitions)
    .remove({ id: id })
    .write();

  console.log("Delete competition: ", id);
}

function getAllCompetitions() {
  return storage.get(ELEMENT_PATHS.Competitions).value();
}

function getCompetition(id) {
  return storage
    .get(ELEMENT_PATHS.Competitions)
    .find({ id: id })
    .value();
}

function hasCompetition(id) {
  const competition = getCompetition(id);
  return !!competition;
}

module.exports = {
  DEFAULT_STATE,
  ERROR_MESSAGES,

  open,
  clear,
  getState,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  getAllCompetitions,
  getCompetition
};
