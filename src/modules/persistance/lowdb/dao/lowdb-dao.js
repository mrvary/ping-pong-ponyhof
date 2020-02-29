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

function clear(object) {
  storage.setState(object).write();
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
  if (!hasElementPath(elementPath)) {
    // TODO: throw error
    return;
  }

  return storage.get(elementPath).value();
}

function getElement(elementPath, identifier) {
  if (!hasElementPath(elementPath)) {
    // TODO: throw error
    return;
  }

  return storage
    .get(elementPath)
    .find(identifier)
    .value();
}

// TODO: Create Object if Necessary

function createElements(elementPath, elements) {
  if (!hasElementPath(elementPath)) {
    // create new collection with data
    storage.set(elementPath, elements).write();
    return;
  }

  // add matches to collection
  const collection = storage.get(elementPath);
  elements.forEach(element => {
    // TODO: Prüfen, ob es das Element mit dem identifier schon gibt?
    collection.push(element).write();
  });
}

function createElement(elementPath, element, identifier = undefined) {
  if (!hasElementPath(elementPath)) {
    // create new collection with data
    storage.set(elementPath, [element]).write();
    return;
  }

  // check if a element with the identifier exists
  if (identifier && hasElement(elementPath, identifier)) {
    // TODO: throw error
    return;
  }

  storage
    .get(elementPath)
    .push(element)
    .write();
}

function updateElement(elementPath, element, identifier) {
  if (!hasElementPath(elementPath)) {
    // create new collection with data
    storage.set(elementPath, [element]).write();
    return;
  }

  storage
    .get(elementPath)
    .find(identifier)
    .assign(element)
    .write();
}

function deleteElement(elementPath, identifier) {
  if (!hasElement(elementPath, identifier)) {
    return;
  }

  storage
    .get(elementPath)
    .remove(identifier)
    .write();
}

function hasElement(elementPath, identifier) {
  const element = getElement(elementPath, identifier);
  return !!element;
}

function hasElementPath(elementPath) {
  return storage.has(elementPath).value();
}

module.exports = {
  FilePathIsUndefinedException,

  open,
  close,

  clear,
  initStateWithDefaults,
  getState,

  getAllElements,
  getElement,

  createElements,
  createElement,

  updateElement,

  deleteElement
};
