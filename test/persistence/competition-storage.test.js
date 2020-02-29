/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");

const config = require("../config");

const competitionStorage = require("../../src/modules/persistance/lowdb/competition-storage");

afterEach(() => {
    competitionStorage.close();
});

describe("initStateWithDefaults()", () => {
    test("When_StorageIsEmpty_Expect_DefaultsAreInitialized", () => {
        // ARRANGE
        const filePath = null;
        const useInMemory = true;

        // test data
        const jsonObject = readJSONObjectFromDisk(config.JSON_FILE);
        const expectedState = readJSONObjectFromDisk(config.JSON_FILE_WITH_DEFAULTS);

        // ACT
        competitionStorage.init(filePath, useInMemory);
        competitionStorage.initStateWithDefaults(jsonObject);

        // ASSERT
        const actualState = competitionStorage.getState();
        expect(actualState).toEqual(expectedState);
    });
});

// Read json data from file
function readJSONObjectFromDisk(relativePath) {
    const filePath = path.join(__dirname, relativePath);
    return JSON.parse(fs.readFileSync(filePath).toString());
}