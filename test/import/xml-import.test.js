/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");

const config = require("../config");

const {
    ERROR_MESSAGES,
    readCompetitionXMLFileFromDisk,
    convertXMLToJSON
} = require("../../src/modules/import/xml-importer");

describe("readCompetitionXMLFileFromDisk()", () => {
    test("When_FilePathIsUndefined_Expect_FilePathIsNotDefinedException", () => {

        // ASSERT: compare exception message
        expect(() => {
            readCompetitionXMLFileFromDisk()
        }).toThrow(ERROR_MESSAGES.FilePathIsNotDefined);
    });

    test("When_FileDoesNotExist_Expect_FileDoesNotExistException", () => {
        // ARRANGE
        const filePath = path.join(__dirname, "notExist.xml");

        // ASSERT: compare exception message
        expect(() => readCompetitionXMLFileFromDisk(filePath)).toThrow(ERROR_MESSAGES.FileDoesNotExists);
    });

    test("When_FileExists_Expect_XMLContent", () => {
        // ARRANGE
        const filePath = path.join(__dirname, config.XML_FILE_VALID);
        const expectedXMLContent = fs.readFileSync(filePath).toString();

        // ACT
        const xmlContent = readCompetitionXMLFileFromDisk(filePath);

        // ASSERT
        expect(xmlContent).toEqual(expectedXMLContent);
    });
});

describe("convertXMLToJSON()", () => {
    test("When_XMLContentContainsSyntaxError_Expect_XMLInvalidException", () => {
        // ARRANGE
        const filePath = path.join(__dirname, config.XML_FILE_INVALID);
        const xmlContent = readCompetitionXMLFileFromDisk(filePath);

        // ASSERT: compare exception message
        expect(() => convertXMLToJSON(xmlContent)).toThrow(ERROR_MESSAGES.XMLInvalidException);
    });

    test("When_XMLContentIsValid_Expect_JsonObject", () => {
        // ARRANGE
        // load xml content
        const xmlFilePath = path.join(__dirname, config.XML_FILE_VALID);
        const xmlContent = readCompetitionXMLFileFromDisk(xmlFilePath);

        // load expected json file
        const jsonFilePath = path.join(__dirname, config.JSON_FILE);
        const expectedJsonObject = readJSONObjectFromDisk(jsonFilePath);

        // ACT
        const jsonObject = convertXMLToJSON(xmlContent);

        // ASSERT: compare exception message
        expect(jsonObject).toEqual(expectedJsonObject);
    });
});

function readJSONObjectFromDisk() {
    // Read json data from file
    const filePath = path.join(__dirname, config.JSON_FILE);
    return JSON.parse(fs.readFileSync(filePath).toString());
}
