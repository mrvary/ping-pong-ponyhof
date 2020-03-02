/**
 * @author Marco Goebel
 */

const lowDBDao = require("./dao/lowdb-dao");

// Error Messages
const FilePathIsUndefinedException = lowDBDao.FilePathIsUndefinedException;
const ERROR_MESSAGES = {
  FilePathIsUndefinedException,
  CompetitionExistsException: "competition already exits"
};

// Element Paths
const ELEMENT_PATHS = { COMPETITIONS: "competitions" };

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

  initStateWithDefaults({ competitions: [] });
}

function initStateWithDefaults(jsonObject) {
  lowDBDao.initStateWithDefaults(storage, jsonObject);
}

function getState() {
  return lowDBDao.getState(storage);
}

function clear() {
  const object = { competitions: [] };
  lowDBDao.clear(storage, object);
}

function close() {
  if (storage) {
    storage = null;
  }
}

function createCompetition(competition) {
  if (hasCompetition(competition.id)) {
    throw new Error(ERROR_MESSAGES.CompetitionExistsException);
  }

  lowDBDao.createElement(storage, ELEMENT_PATHS.COMPETITIONS, competition);
}

function updateCompetition(competition) {
  const storedCompetition = lowDBDao.getElement(
    storage,
    ELEMENT_PATHS.COMPETITIONS,
    {
      id: competition.id
    }
  );

  if (!storedCompetition) {
    createCompetition(competition);
    return;
  }

  lowDBDao.updateElement(storage, ELEMENT_PATHS.COMPETITIONS, competition, {
    id: competition.id
  });
}

function deleteCompetition(id) {
  lowDBDao.deleteElement(storage, ELEMENT_PATHS.COMPETITIONS, { id: id });
}

function getAllCompetitions() {
  return lowDBDao.getAllElements(storage, ELEMENT_PATHS.COMPETITIONS);
}

function getCompetition(id) {
  return lowDBDao.getElement(storage, ELEMENT_PATHS.COMPETITIONS, { id: id });
}

function hasCompetition(id) {
  const competition = getCompetition(id);
  return !!competition;
}

module.exports = {
  ERROR_MESSAGES,

  init,
  clear,
  initStateWithDefaults,
  getState,
  close,

  getAllCompetitions,
  getCompetition,

  createCompetition,
  updateCompetition,
  deleteCompetition
};
