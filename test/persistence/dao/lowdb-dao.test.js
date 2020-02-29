/**
 * @author Marco Goebel
 */

const lowDBDao = require("../../../src/modules/persistance/lowdb/dao/lowdb-dao");

afterEach(() => {
    lowDBDao.close();
});

describe("open()", () => {
    test("When_FilePathIsUndefined_Expect_FilePathIsNotDefinedException", () => {
        // ARRANGE: set input values
        const filePath = null;
        const useInMemory = false;

        // ACT
        const method = () => { lowDBDao.open(filePath, useInMemory) };

        // ASSERT
        expect(method).toThrow(lowDBDao.FilePathIsUndefinedException);
    });
});

describe("initStateWithDefaults()", () => {
    test("When_StorageIsEmpty_Expect_DefaultsAreInitialized", () => {
        // ARRANGE
        const object = { collection: [] };
        const expectedState = { collection: [] };

        // ACT
        lowDBDao.open();
        lowDBDao.initStateWithDefaults(object);

        // ASSERT
        const actualState = lowDBDao.getState();
        expect(actualState).toEqual(expectedState);
    });
});

describe("createElements()", () => {
    test("When_NoElementFlagExist_Expect_AddFlagWithData", () => {
        // ARRANGE
        // test data
        const elementPath = "matches";
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
        lowDBDao.open();
        lowDBDao.createElements(elementPath, matches);

        // ASSERT
        const actualState = lowDBDao.getState();
        expect(actualState).toEqual(expectedState);
    });

    test("When_MatchFlagExists_Expect_AddMatchesToCollection", () => {
        // ARRANGE
        // test data
        const elementPath = "matches";
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
        lowDBDao.open();
        lowDBDao.createElements(elementPath, initMatches);

        // ACT
        lowDBDao.createElements(elementPath, newMatches);

        // ASSERT
        const actualState = lowDBDao.getState();
        expect(actualState).toEqual(expectedState);
    });
});

describe("getAllElements()", () => {
    test("When_ElementsAreSaved_Expect_GetAllElements", () => {
        // ARRANGE
        // test data
        const elementPath = "matches";
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
        lowDBDao.open();
        lowDBDao.createElements(elementPath, initMatches);

        // ACT
        const actualMatches = lowDBDao.getAllElements(elementPath);

        // ASSERT
        expect(actualMatches).toEqual(initMatches);
    });
});