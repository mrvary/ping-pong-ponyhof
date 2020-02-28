/**
 * @author Marco Goebel
 */

const fs = require("fs");
const parser = require("fast-xml-parser");

const {
  createCompetitionFromJSON,
  updateCompetitionStatus,
  updateCompetitionRoundMatches
} = require("../../modules/models/competition");
const { createPlayersFromJSON } = require("../../matchmaker/player");

const matchmaker = require("../../matchmaker/drawing");

const ERROR_MESSAGES = {
  FilePathIsNotDefined: "file path is not defined",
  FileDoesNotExists: "The file does not exist"
};

/**
 * Import XML-File into databases and draw first round of competition
 * @param filePath
 * @param fileManager
 * @param metaStorage
 * @param competitionStorage
 * @returns {{competitionId: int, matches: [], players: []}}
 */
function importXML(filePath, fileManager, metaStorage, competitionStorage) {
  // read xml file from disk
  const xmlContent = readCompetitionXMLFileFromDisk(filePath);
  // convert xml content to json content and create a json object
  const jsonObject = convertXMLToJSON(xmlContent);

  // store meta data about the competition in meta database
  const competition = createCompetitionFromJSON(jsonObject.tournament);
  metaStorage.createCompetition(competition);

  // create competition database for xml file and store the jsonObject of the competition
  const competitionFilePath = fileManager.getCompetitionFilePath(
    competition.id
  );
  competitionStorage.open(competitionFilePath, config.USE_IN_MEMORY_STORAGE);
  competitionStorage.initWithCompetition(jsonObject);

  // TODO: init meta data object about current competition

  // use matchmaker to draw first round
  const players = createPlayersFromJSON(jsonObject);
  const matches = matchmaker.drawRound(players);
  console.log("Matchmaker draws the first round");

  // TODO: use "matchmaker.updatePlayers()"
  // TODO: update player data with match id's

  // store matches and players into the competition database
  competitionStorage.createMatches(matches);
  competitionStorage.createPlayers(players);

  // store match id of the current round
  updateCompetitionRoundMatches(competition, matches);

  // update competition status
  updateCompetitionStatus(competition, false, false);
  metaStorage.updateCompetition(competition);

  return competition;
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
    parseAttributeValue: true
  };

  const result = parser.validate(xmlContent, options);
  if (!result) {
    console.log("xml is not valid", result.err);
  }

  const jsonObject = parser.parse(xmlContent, options);
  console.log("Convert xml file to json");

  return jsonObject;
}

module.exports = {
  ERROR_MESSAGES,

  readCompetitionXMLFileFromDisk,
  convertXMLToJSON
};
