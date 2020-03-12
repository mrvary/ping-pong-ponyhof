/**
 * @author Marco Goebel
 */

const fs = require("fs");
const parser = require("fast-xml-parser");

const config = require("../../electron/config");

// competition model
const {
  createCompetitionFromJSON
} = require("../../shared/models/competition");

// player model
const { createPlayersFromJSON } = require("../../matchmaker/player");

let xmlFilePath = null;
let jsonObject = null;

let competition = null;
let players = null;

const ERROR_MESSAGES = {
  FilePathIsNotDefined: "The file path is not defined",
  FileDoesNotExists: "The file does not exist",
  XMLInvalidException: "XML is invalid"
};

/**
 * Sets path of file which should imported
 * @access public
 * @param filePath
 */
function setFilePath(filePath) {
  if (!filePath) {
    return;
  }

  xmlFilePath = filePath;
}

/**
 * Opens the xml file, validate content and convert it to JSON.
 * @access public
 * @returns {{players: [], competition: object}} Returns a preview of the xml competition
 */
function createCompetitionPreview() {
  // check if a xml file is selected
  if (!xmlFilePath) {
    console.log("xml file path is undefined");
    return undefined;
  }

  // load xml file
  const xmlContent = readCompetitionXMLFileFromDisk(xmlFilePath);

  // convert xml file to JSON-Object
  jsonObject = convertXMLToJSON(xmlContent);

  // parse JSON-Object for preview data
  competition = createCompetitionFromJSON(jsonObject);
  players = createPlayersFromJSON(jsonObject);

  // reset selected xml file
  xmlFilePath = null;

  // return preview object
  return {
    competition,
    players
  };
}

/**
 * Imports the xml content into the lowDB database
 * @access public
 * @param dbManager
 */
function importXMLIntoDatabases(dbManager) {
  if (!competition) {
    const errorMessage = "Competition is not initialized";
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  if (!players) {
    const errorMessage = "Players is not initialized";
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  // initialize competition storage
  dbManager.initCompetitionStorage(
    competition.id,
    config.USE_IN_MEMORY_STORAGE,
    jsonObject
  );

  // save players into competition storage
  const playerRepository = dbManager.getPlayerRepository();
  playerRepository.createPlayers(players);
  console.log("Save players into competition storage");

  // save competition meta infos into meta storage
  const metaRepository = dbManager.getMetaRepository();
  metaRepository.createCompetition(competition);
  console.log("Save competition meta infos into meta storage");

  // reset app state variables
  jsonObject = null;
  competition = null;
  players = null;
}

/**
 * Read content of xml file
 * @access private
 * @param filePath
 * @returns {string}
 */
function readCompetitionXMLFileFromDisk(filePath) {
  if (!filePath) {
    console.log(ERROR_MESSAGES.FilePathIsNotDefined);
    throw new Error(ERROR_MESSAGES.FilePathIsNotDefined);
  }

  // check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(ERROR_MESSAGES.FileDoesNotExists);
    throw new Error(ERROR_MESSAGES.FileDoesNotExists);
  }

  // read file from disk
  const xmlContent = fs.readFileSync(filePath).toString();
  console.log("Read XML-File:", filePath);

  return xmlContent;
}

/**
 * Convert xml to a json object
 * @access private
 * @param xmlContent
 * @returns {any}
 */
function convertXMLToJSON(xmlContent) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    parseAttributeValue: false
  };

  try {
    const jsonObject = parser.parse(xmlContent, options, true);
    console.log("Convert xml file to json");

    return jsonObject;
  } catch (error) {
    console.log(ERROR_MESSAGES.XMLInvalidException);
    throw new Error(ERROR_MESSAGES.XMLInvalidException);
  }
}

module.exports = {
  ERROR_MESSAGES,

  setFilePath,
  createCompetitionPreview,
  importXMLIntoDatabases,

  readCompetitionXMLFileFromDisk,
  convertXMLToJSON
};
