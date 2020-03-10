/**
 * @author Daniel Niemczyk
 */

const { saveXMLFile } = require("../persistance/file-manager");

function exportXML(players, matches, initJSON) {
  var Parser = require("fast-xml-parser").j2xParser;

  let matchesToAdd = [];
  matches.forEach(match => {
    matchesToAdd.push({
      //todo add round nr
      group: "Schweizer System",
      nr: match.id,
      "player-a": match.player1,
      "player-b": match.player2,
      //todo set other values
      "matches-a": 0,
      "matches-b": 0,
      "sets-a": 0,
      "sets-a": 0,
      "sets-a-1": 0,
      "sets-b-1": 0,
      "sets-a-2": 0,
      "sets-b-2": 0,
      "sets-a-3": 0,
      "sets-b-3": 0,
      "sets-a-4": 0,
      "sets-b-4": 0,
      "sets-a-5": 0,
      "sets-b-5": 0,
      "sets-a-6": 0,
      "sets-b-6": 0,
      "sets-a-7": 0,
      "sets-b-7": 0,
      "games-a": 0,
      "games-b": 0
    });
  });

  initJSON.competition.matches = {
    match: matchesToAdd
  };

  var defaultOptions = {
    attributeNamePrefix: "",
    attrNodeName: "", //default is false
    textNodeName: "#text",
    ignoreAttributes: false,
    format: true,
    indentBy: "  ",
    supressEmptyNode: false
  };

  var parser = new Parser(defaultOptions);
  var xml = parser.parse(initJSON);
  //ToDo check against .dtd schema

  saveXMLFile("finalesErgebnis.xml", xml);
}

module.exports = {
  exportXML
};
