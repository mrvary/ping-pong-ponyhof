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
} = require("../../src/modules/import/xml-import");

describe("readCompetitionXMLFileFromDisk()", () => {
    test("When_FilePathIsUndefined_Expect_FilePathIsNotDefinedException", () => {
        // ACT
        let message = null;
        try {
            const xmlContent = readCompetitionXMLFileFromDisk();
        } catch (e) {
            message = e.message;
        } finally {
            // ASSERT: compare exception message
            expect(message).toEqual(ERROR_MESSAGES.FilePathIsNotDefined);
        }
    });

    test("When_FileDoesNotExist_Expect_FileDoesNotExistException", () => {
        // ARRANGE
        const filePath = path.join(__dirname, "notExist.xml");

        // ACT
        let message = null;
        try {
            readCompetitionXMLFileFromDisk(filePath);
        } catch (e) {
            message = e.message;
        } finally {
            // ASSERT: compare exception message
            expect(message).toEqual(ERROR_MESSAGES.FileDoesNotExists);
        }
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

        // ACT
        let message = null;
        try {
            const jsonObject = convertXMLToJSON(filePath);
        } catch (e) {
            message = e.message;
        } finally {
            // ASSERT: compare exception message
            expect(message).toEqual(ERROR_MESSAGES.XMLInvalidException);
        }
    });

    test("When_XMLContentIsValid_Expect_JsonObject", () => {
        // ARRANGE
        // load xml content
        const xmlFilePath = path.join(__dirname, config.XML_FILE_VALID);

        // load expected json file
        const jsonFilePath = path.join(__dirname, config.JSON_FILE);
        const expectedJsonObject = readJSONObjectFromDisk(jsonFilePath);

        // ACT
        const jsonObject = convertXMLToJSON(xmlFilePath);

        // ASSERT: compare exception message
        expect(jsonObject).toEqual(expectedJsonObject);
    });
});

function readJSONObjectFromDisk() {
    // Read json data from file
    const filePath = path.join(__dirname, config.JSON_FILE);
    return JSON.parse(fs.readFileSync(filePath).toString());
}
