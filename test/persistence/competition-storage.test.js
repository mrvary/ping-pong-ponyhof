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

describe("init()", () => {
    test("When_FilePathIsUndefined_Expect_FilePathIsNotDefinedException", () => {
        // ARRANGE
        const filePath = null;
        const useInMemory = false;

        // ACT
        const method = () => { competitionStorage.init(filePath, useInMemory) };

        // ASSERT
        expect(method).toThrow(competitionStorage.ERROR_MESSAGES.FilePathIsUndefinedException);
    })
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

describe("createElements()", () => {
    beforeEach(() => {
        const filePath = null;
        const useInMemory = true;

        competitionStorage.init(filePath, useInMemory);
    });

    afterEach(() => {
        competitionStorage.close();
    });

    test("When_NoElementFlagExist_Expect_AddFlagWithData", () => {
        // ARRANGE
        // test data
        const matches = [
            {
                id: 1,
                player1: "PLAYER1",
                player2: "PLAYER2",
                sets: []
            },
            {
                id: 2,
                player1: "PLAYER3",
                player2: "PLAYER4",
                sets: []
            }
        ];

        // expected result
        const expectedState = { matches: matches };

        // ACT
        competitionStorage.createMatches(matches);

        // ASSERT
        const actualState = competitionStorage.getState();
        expect(actualState).toEqual(expectedState);
    });

    test("When_MatchFlagExists_Expect_AddMatchesToCollection", () => {
        // ARRANGE
        // test data
        const initMatches = [
            {
                id: 1,
                player1: "PLAYER1",
                player2: "PLAYER2",
                sets: []
            },
            {
                id: 2,
                player1: "PLAYER3",
                player2: "PLAYER4",
                sets: []
            }
        ];
        const newMatches = [
            {
                id: 3,
                player1: "PLAYER1",
                player2: "PLAYER2",
                sets: []
            },
            {
                id: 4,
                player1: "PLAYER3",
                player2: "PLAYER4",
                sets: []
            }
        ];
        const mergedMatches = initMatches.concat(newMatches);

        // expected result
        const expectedState = { matches: mergedMatches };

        // create database with test data
        competitionStorage.createMatches(initMatches);

        // ACT
        competitionStorage.createMatches(newMatches);

        // ASSERT
        const actualState = competitionStorage.getState();
        expect(actualState).toEqual(expectedState);
    });
});

describe("getAllElements()", () => {
    test("When_ElementsAreSaved_Expect_GetAllElements", () => {
        // ARRANGE
        const filePath = null;
        const useInMemory = true;

        // test data
        const initMatches = [
            {
                id: 1,
                player1: "PLAYER1",
                player2: "PLAYER2",
                sets: []
            },
            {
                id: 2,
                player1: "PLAYER3",
                player2: "PLAYER4",
                sets: []
            }
        ];

        // create database with test data
        competitionStorage.init(filePath, useInMemory);
        competitionStorage.createMatches(initMatches);

        // ACT
        const actualMatches = competitionStorage.getAllMatches();

        // ASSERT
        expect(actualMatches).toEqual(initMatches);
    });
});

// Read json data from file
function readJSONObjectFromDisk(relativePath) {
    const filePath = path.join(__dirname, relativePath);
    return JSON.parse(fs.readFileSync(filePath).toString());
}