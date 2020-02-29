/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const FilePathIsUndefinedException = "file path is undefined";

let storage = null;

// STATE OPERATIONS

function open(filePath, useInMemory = true) {
  if (storage) {
    return;
  }

  // check the parameter
  if (!useInMemory && !filePath) {
    throw new Error(FilePathIsUndefinedException);
  }

  // create a low db instance
  const adapter = useInMemory ? new Memory() : new FileSync(filePath);
  storage = low(adapter);
}

function close() {
  if (storage) {
    storage = null;
  }
}

function initStateWithDefaults(object) {
  //storage.setState(jsonObject).write();
  storage.defaults(object).write();
}

function getState() {
  return storage.getState();
}

// CRUD FUNCTIONALITY

function getAllElements(elementPath) {
  return storage.get(elementPath).value();
}

function createElements(elementPath, elements) {
  if (!hasElementPath(elementPath)) {
    // create new collection with data
    storage.set(elementPath, elements).write();
    return;
  }

  // add matches to collection
  const collection = storage.get(elementPath);
  elements.forEach(element => {
    collection.push(element).write();
  });
}

function hasElementPath(elementPath) {
  return storage.has(elementPath).value();
}

module.exports = {
  FilePathIsUndefinedException,

  open,
  close,

  initStateWithDefaults,
  getState,

  getAllElements,
  createElements
};
