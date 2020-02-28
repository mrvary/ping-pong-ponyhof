/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");

const config = require("../config");

const { readCompetitionXMLFileFromDisk, ERROR_MESSAGES } = require("../../src/modules/import/xml-import");

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
            const xmlContent = readCompetitionXMLFileFromDisk(filePath);
        } catch (e) {
            message = e.message;
        } finally {
            // ASSERT: compare exception message
            expect(message).toEqual(ERROR_MESSAGES.FileDoesNotExists);
        }
    });

    test("When_FileExists_Expect_XMLContent", () => {
        // ARRANGE
        const filePath = path.join(__dirname, config.XML_FILE);
        const expectedXMLContent = fs.readFileSync(filePath).toString();

        // ACT
        const xmlContent = readCompetitionXMLFileFromDisk(filePath);

        // ASSERT
        expect(xmlContent).toEqual(expectedXMLContent);
    });
});
