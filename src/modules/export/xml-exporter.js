/**
 * @author Daniel Niemczyk
 */

const { saveXMLFile } = require("../persistance/file-manager");
const { createXMLMatch } = require("../../matchmaker/match");
let Parser = require("fast-xml-parser").j2xParser;

function exportXML(filePath, matches, initJSON) {
  let matchesToAdd = [];
  let round = 1;
  let counter = 0;
  matches.forEach(match => {
    matchesToAdd.push(createXMLMatch(match, round));
    counter++;
    //increase round after all matches of a round finished
    if (counter % (matches.length / 6) === 0) round++;
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

  saveXMLFile(filePath, xml);
}

module.exports = {
  exportXML
};
