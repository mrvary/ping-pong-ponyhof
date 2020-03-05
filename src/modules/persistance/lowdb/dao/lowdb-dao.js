/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const FilePathIsUndefinedException = "file path is undefined";

// STATE OPERATIONS

function open(filePath, useInMemory = true) {
  // check the parameter
  if (!useInMemory && !filePath) {
    throw new Error(FilePathIsUndefinedException);
  }

  // create a low db instance
  const adapter = useInMemory ? new Memory() : new FileSync(filePath);
  return low(adapter);
}

function clear(storage, object) {
  storage.setState(object).write();
}

function initStateWithDefaults(storage, object) {
  storage.defaults(object).write();
}

function getState(storage) {
  return storage.getState();
}

// CRUD FUNCTIONALITY

function getAllElements(storage, elementPath) {
  if (!hasElementPath(storage, elementPath)) {
    // TODO: throw error
    return;
  }

  return storage.get(elementPath).value();
}

function getElement(storage, elementPath, identifier) {
  if (!hasElementPath(storage, elementPath)) {
    // TODO: throw error
    return;
  }

  return storage
    .get(elementPath)
    .find(identifier)
    .value();
}

// TODO: Create Object if Necessary

function createElements(storage, elementPath, elements) {
  if (!hasElementPath(storage, elementPath)) {
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

function createElement(storage, elementPath, element, identifier = undefined) {
  if (!hasElementPath(storage, elementPath)) {
    // create new collection with data
    storage.set(elementPath, [element]).write();
    return;
  }

  // check if a element with the identifier exists
  if (identifier && hasElement(storage, elementPath, identifier)) {
    // TODO: throw error
    return;
  }

  storage
    .get(elementPath)
    .push(element)
    .write();
}

function updateElement(storage, elementPath, element, identifier) {
  if (!hasElementPath(storage, elementPath)) {
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

function deleteElement(storage, elementPath, identifier) {
  if (!hasElement(storage, elementPath, identifier)) {
    return;
  }

  storage
    .get(elementPath)
    .remove(identifier)
    .write();
}

function hasElement(storage, elementPath, identifier) {
  const element = getElement(storage, elementPath, identifier);
  return !!element;
}

function hasElementPath(storage, elementPath) {
  return storage.has(elementPath).value();
}

module.exports = {
  FilePathIsUndefinedException,

  open,

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
