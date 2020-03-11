/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const FilePathIsUndefinedException = "file path is undefined";

// ---------------------------------
// Initialization operations
// ---------------------------------

/**
 * Open new lowDB connection
 * @access public
 * @param filePath
 * @param useInMemory
 */
function open(filePath, useInMemory = true) {
  // check the parameter
  if (!useInMemory && !filePath) {
    throw new Error(FilePathIsUndefinedException);
  }

  // create a low db instance
  const adapter = useInMemory ? new Memory() : new FileSync(filePath);
  return low(adapter);
}

/**
 * Override the current lowDB state with a new state
 * @access public
 * @param storage
 * @param object
 */
function clear(storage, object) {
  storage.setState(object).write();
}

/**
 * Initialize lowDB state with a default values
 * @access public
 * @param storage
 * @param object
 */
function initStateWithDefaults(storage, object) {
  storage.defaults(object).write();
}

/**
 * Return the current lowDB state
 * @access public
 * @param storage
 * @returns {"progressing" | "completed" | "cancelled" | "interrupted" | MatcherState | Promise<NavigationPreloadState>}
 */
function getState(storage) {
  return storage.getState();
}

// ---------------------------------
// CRUD FUNCTIONALITY
// ---------------------------------

/**
 * Returns all elements of an object path
 * @access public
 * @param storage
 * @param elementPath
 * @returns {*}
 */
function getAllElements(storage, elementPath) {
  if (!hasElementPath(storage, elementPath)) {
    return;
  }

  return storage.get(elementPath).value();
}

/**
 * Return one single element of an object path
 * @access public
 * @param storage
 * @param elementPath
 * @param identifier
 * @returns {*}
 */
function getElement(storage, elementPath, identifier) {
  if (!hasElementPath(storage, elementPath)) {
    return;
  }

  return storage
    .get(elementPath)
    .find(identifier)
    .value();
}

/**
 * Adds new elements into an object path
 * @access public
 * @param storage
 * @param elementPath
 * @param elements
 */
function createElements(storage, elementPath, elements) {
  if (!hasElementPath(storage, elementPath)) {
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

/**
 * Adds a new element into an object path.
 * @access public
 * @param storage
 * @param elementPath
 * @param element
 * @param identifier
 */
function createElement(storage, elementPath, element, identifier = undefined) {
  if (!hasElementPath(storage, elementPath)) {
    // create new collection with data
    storage.set(elementPath, [element]).write();
    return;
  }

  // check if a element with the identifier exists
  if (identifier && hasElement(storage, elementPath, identifier)) {
    return;
  }

  storage
    .get(elementPath)
    .push(element)
    .write();
}

/**
 * Update single element in object path.
 * If the element does not exists it would be created.
 * @access public
 * @param storage
 * @param elementPath
 * @param element
 * @param identifier
 */
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

/**
 * Delete element in object path
 * @access public
 * @param storage
 * @param elementPath
 * @param identifier
 */
function deleteElement(storage, elementPath, identifier) {
  if (!hasElement(storage, elementPath, identifier)) {
    return;
  }

  storage
    .get(elementPath)
    .remove(identifier)
    .write();
}

/**
 * Checks if an object exists under the element path
 * @access public
 * @param storage
 * @param elementPath
 * @param identifier
 * @returns {boolean}
 */
function hasElement(storage, elementPath, identifier) {
  const element = getElement(storage, elementPath, identifier);
  return !!element;
}

/**
 * Checks if an element path in the lowDB database exists
 * @access public
 * @param storage
 * @param elementPath
 * @returns {*}
 */
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
