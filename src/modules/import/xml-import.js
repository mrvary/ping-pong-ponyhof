/**
 * @author Marco Goebel
 */

const fs = require("fs");
const parser = require("xml2json");

const {
  createCompetitionFromJSON,
  setCompetitionStatus,
  setMatchesOfCurrentRound
} = require("../../modules/models/competition");
const { createPlayersFromJSON } = require("../../matchmaker/player");

const config = require("../../electron/config");
const matchmaker = require("../../matchmaker/drawing");

/**
 * Import XML-File into databases and draw first round of competition
 * @param filePath
 * @param fileManager
 * @param metaStorage
 * @param competitionStorage
 * @returns {{competitionId: int, matches: [], players: []}}
 */
function importXML(filePath, fileManager, metaStorage, competitionStorage) {
  // read xml file from disk and convert it to json object
  const jsonObject = readTournamentXMLFileFromDisk(filePath);

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
  setMatchesOfCurrentRound(competition, matches);

  // update competition status
  setCompetitionStatus(competition, false, false);
  metaStorage.updateCompetition(competition);

  return competition;
}

/**
 * Read the tournament xml file from disk and convert it to JSON-Object
 * @param {string} filePath - The file path of the resource
 * @returns {jsonObject: JSON-Object}
 */
function readTournamentXMLFileFromDisk(filePath) {
  if (!filePath) {
    console.log("The competition already exists");
    throw new Error(`Die XML-Datei konnte nicht gefunden werden.`);
  }

  // read file from disk
  const xmlContent = fs.readFileSync(filePath);
  console.log("Read XML-File:", filePath);

  // convert xml to json object
  const options = { reversible: false };
  const jsonContent = parser.toJson(xmlContent, options);
  const jsonObject = JSON.parse(jsonContent);
  console.log("Convert xml file to json");

  return jsonObject;
}

module.exports.importXML = importXML;
