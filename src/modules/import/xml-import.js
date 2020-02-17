/**
 * @author Marco Goebel
 */

const fs = require("fs");
const parser = require("xml2json");

/**
 * Read the tournament xml file from disc and convert it to JSON-Object
 * @public
 * @param {string} filePath - The file path of the resource
 * @returns {JSONObject}
 */
function readTournamentXMLFileFromDisk(filePath) {
  // read file from disc
  const xmlContent = fs.readFileSync(filePath);
  console.log("Read XML-File: ", filePath);

  // convert xml to json object
  const options = { reversible: false };
  const jsonContent = parser.toJson(xmlContent, options);
  const jsonObject = JSON.parse(jsonContent);

  return jsonObject;
}

module.exports = {
  readTournamentXMLFileFromDisk
};
