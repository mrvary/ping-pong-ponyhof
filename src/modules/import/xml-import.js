/**
 * @author Marco Goebel
 */

const fs = require("fs");
const parser = require("fast-xml-parser");

const ERROR_MESSAGES = {
  FilePathIsNotDefined: "The file path is not defined",
  FileDoesNotExists: "The file does not exist",
  XMLInvalidException: "XML is invalid"
};

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

  readCompetitionXMLFileFromDisk,
  convertXMLToJSON
};
