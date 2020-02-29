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

// STATE OPERATIONS

function init(filePath, useInMemory = true) {
  internalFilePath = filePath;
  internalUseInMemory = useInMemory;
}

function initStateWithDefaults(jsonObject) {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  lowDBDao.initStateWithDefaults(jsonObject);
}

function getState() {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  return lowDBDao.getState();
}

function clear() {
  const object = { competitions: [] };
  lowDBDao.clear(object);
}

function createCompetition(competition) {
  if (hasCompetition(competition.id)) {
    throw new Error(ERROR_MESSAGES.CompetitionExistsException);
  }

  lowDBDao.open(internalFilePath, internalUseInMemory);
  lowDBDao.createElement(ELEMENT_PATHS.COMPETITIONS, competition);
}

function updateCompetition(competition) {
  lowDBDao.open(internalFilePath, internalUseInMemory);

  const storedCompetition = lowDBDao.getElement(ELEMENT_PATHS.COMPETITIONS, {
    id: competition.id
  });
  if (!storedCompetition) {
    createCompetition(competition);
    return;
  }

  lowDBDao.updateElement(ELEMENT_PATHS.COMPETITIONS, competition, {
    id: competition.id
  });
}

function deleteCompetition(id) {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  lowDBDao.deleteElement(ELEMENT_PATHS.COMPETITIONS, { id: id });
}

function getAllCompetitions() {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  return lowDBDao.getAllElements(ELEMENT_PATHS.COMPETITIONS);
}

function getCompetition(id) {
  lowDBDao.open(internalFilePath, internalUseInMemory);
  return lowDBDao.getElement(ELEMENT_PATHS.COMPETITIONS, { id: id });
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
