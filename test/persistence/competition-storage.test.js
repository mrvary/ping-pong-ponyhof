/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");

const config = require("../config");

const competitionStorage = require("../../src/modules/persistance/lowdb/competition-storage");

const COMP_ERROR_MESSAGES = competitionStorage.COMP_ERROR_MESSAGES;

describe("openStorage()", () => {
    test("When_FilePathIsUndefined_Expect_FilePathIsNotDefinedException", () => {
        // ARRANGE: set input values
        const filePath = null;
        const useInMemory = false;

        // ASSERT
        expect(() => {
            competitionStorage.openStorage(filePath, useInMemory)
        }).toThrow(COMP_ERROR_MESSAGES.FilePathIsUndefinedException);
    });
});

describe("initStateWithDefaults()", () => {
    test("When_StorageIsEmpty_Expect_DefaultsAreInitialized", () => {
        // ARRANGE
        const filePath = null;
        const useInMemory = true;
        const jsonObject = readJSONObjectFromDisk(config.JSON_FILE);
        const expectedState = readJSONObjectFromDisk(config.JSON_FILE_WITH_DEFAULTS);

        // ACT
        competitionStorage.openStorage(filePath, useInMemory);
        competitionStorage.initStateWithDefaults(jsonObject);

        // ASSERT
        const actualState = competitionStorage.getState();
        expect(actualState).toEqual(expectedState);
    });
});

function readJSONObjectFromDisk(relativePath) {
    // Read json data from file
    const filePath = path.join(__dirname, relativePath);
    return JSON.parse(fs.readFileSync(filePath).toString());
}