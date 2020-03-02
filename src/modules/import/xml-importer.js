/**
 * @author Marco Goebel
 */

const fs = require("fs");
const parser = require("fast-xml-parser");

// competition model
const { createCompetitionFromJSON } = require("../models/competition");

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

function setFilePath(filePath) {
  if (!filePath) {
    return;
  }

  xmlFilePath = filePath;
}

function createCompetitionPreview() {
  // check if a xml file is selected
  if (!xmlFilePath) {
    // TODO: Fehler: XML-Datei ist nicht ausgewählt
    return;
  }

  // 1. load xml file
  const xmlContent = readCompetitionXMLFileFromDisk(xmlFilePath);

  // TODO: Search for XML-Schema validator
  // 2. validate xml file against xml-schema --> Fehler: XML-Datei ist nicht valide

  // 3. convert xml file to JSON-Object
  jsonObject = convertXMLToJSON(xmlContent);

  // 4. parse JSON-Object for necessary data
  competition = createCompetitionFromJSON(jsonObject);
  players = createPlayersFromJSON(jsonObject);

  // reset selected xml file
  xmlFilePath = null;

  return {
    competition,
    players
  };
}

function importXMLIntoDatabases(metaRepository, competitionStorage) {
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

  // Initialize default values of competition storage
  competitionStorage.initStateWithDefaults(jsonObject);
  console.log("Initialized competition storage with json object");

  // save players into competition storage
  competitionStorage.createPlayers(players);
  console.log("Save players into competition storage");

  // save competition meta infos into meta storage
  metaRepository.createCompetition(competition);
  console.log("Save competition meta infos into meta storage");

  // reset app state variables
  jsonObject = null;
  competition = null;
  players = null;
}

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
  // Public
  setFilePath,
  createCompetitionPreview,
  importXMLIntoDatabases,

  // Private
  readCompetitionXMLFileFromDisk,
  convertXMLToJSON
};
