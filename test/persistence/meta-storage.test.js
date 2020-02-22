/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");
const config = require("../config");

const metaStorage = require("../../src/modules/persistance/lowdb/meta-storage");

const {
    expectedCompetitionWithDefaultValues,
    expectedUpdatedCompetition,
    expectedAllCompetitions
} = require("../models/competition.test.data");
const { createCompetitionFromJSON, STATUS } = require("../../src/modules/models/competition");

let jsonObject = null;

beforeAll(() => {
    jsonObject = readCompetitionFile();
});

describe("open()", () => {
    test ("When_FilePathIsUndefined_Expect_ExceptionError1", () => {
        // ARRANGE: set input values
        const filePath = null;
        const useInMemory = false;

        // ACT: open storage with undefined file path
        let message = null;
        try {
            metaStorage.open(filePath, useInMemory);
        } catch (e) {
            message = e.message;
        } finally {
            // ASSERT: check if error message is the same
            expect(message).toEqual(metaStorage.ERROR_MESSAGES.Error1)
        }
    });

    test("When_EmptyStorageIsOpen_Expect_InitializedWithDefaults", () => {
        // ARRANGE: create expected state
        const expectedState = {competitions: []};

        // ACT: create tournament entry
        metaStorage.open('', true);
        const actualState = metaStorage.getState();

        // ASSERT: check the result
        expect(actualState).toEqual(expectedState);
    });
});

describe("clear()", () => {
    beforeAll(() => {
        metaStorage.open("", true);
    });

   test("When_ExecuteMethod_Expected_OnlyContainsDefaults", () => {
       // ARRANGE: create dummy data
       const expectedState = {competitions: []};
       const competition = createCompetitionFromJSON(jsonObject.tournament);
       metaStorage.createCompetition(competition);

       // ACT: execute method
       metaStorage.clear();

       // ARRANGE:
       const actualState = metaStorage.getState();
       expect(actualState).toEqual(expectedState);
   });
});

describe("createCompetition()", () => {
    beforeEach(() => {
        metaStorage.open("", true);
    });

    afterEach(() => {
        metaStorage.clear();
    });

    test("When_StorageDoesNotContainCompetition_Expect_CompetitionIsCreated", () => {
        // ARRANGE: create competition from json object
        const competition = createCompetitionFromJSON(jsonObject.tournament);
        const expectedState = { competitions: [ expectedCompetitionWithDefaultValues ] };

        // ACT: execute method
        metaStorage.createCompetition(competition);

        // ARRANGE: check current state
        const actualState = metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    });

    test("When_StorageDoesContainCompetition_Expect_ExceptionError2", () => {
        // ARRANGE: create competition from json object
        const competition = createCompetitionFromJSON(jsonObject.tournament);
        metaStorage.createCompetition(competition);

        // ACT: execute methods a second time
        let message = null;
        try {
            metaStorage.createCompetition(competition);
        } catch (e) {
            message = e.message;
        } finally {
            // ASSERT: compare exception message
            expect(message).toEqual(metaStorage.ERROR_MESSAGES.Error2);
        }
    });
});

describe("updateCompetition()", () => {
    beforeEach(() => {
        metaStorage.open("", true);
    });

    afterEach(() => {
        metaStorage.clear();
    });

    test("When_CompetitionDoesNotExists_Expect_CreateNewCompetition", () => {
        // ARRANGE:
        const competition = createCompetitionFromJSON(jsonObject.tournament);
        const expectedState = { competitions: [ expectedCompetitionWithDefaultValues ] };

        // ACT:
        metaStorage.updateCompetition(competition);

        // ASSERT:
        const actualState = metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    });

    test("When_CompetitionDoesExists_Expect_UpdateCompetitionObject", () => {
        // ARRANGE:
        const expectedState = {competitions: [ expectedUpdatedCompetition ]};

        const competition = createCompetitionFromJSON(jsonObject.tournament);
        metaStorage.createCompetition(competition);
        competition.round_matchIds = [ 0, 1, 2, 3, 4, 5 ];
        competition.status = STATUS.ROUND_STARTED;

        // ACT:
        metaStorage.updateCompetition(competition);

        // ARRANGE:
        const actualState= metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    })
});

describe("deleteCompetition()", () => {
    beforeEach(() => {
        metaStorage.open("", true);
    });

    test("When_CompetitionDoesNotExist_Expect_DefaultState", () => {
        // ARRANGE:
        const expectedState = { competitions: [] };
        const competition = createCompetitionFromJSON(jsonObject.tournament);
        metaStorage.createCompetition(competition);

        // ACT:
        metaStorage.deleteCompetition(competition.id);

        // ASSERT:
        const actualState = metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    });
});

describe("getAllCompetitions()", () => {
   beforeEach(() => {
       metaStorage.open("", true);
   });

   test("When_StorageContainsTwoElements_Expect_TwoElements", () => {
       // ARRANGE:
       expectedAllCompetitions.forEach(competition => {
           metaStorage.createCompetition(competition);
       });

       // ACT:
       const actualCompetitions = metaStorage.getAllCompetitions();

       // ASSERT:
       expect(actualCompetitions).toEqual(expectedAllCompetitions);
       expect(actualCompetitions.length).toBe(expectedAllCompetitions.length);
   })
});

describe("getCompetition()", () => {
    beforeEach(() => {
        metaStorage.open("", true);
    });

    test("When_StorageContainsCompetition_Expect_SameCompetition", () => {
        // ARRANGE:
        const expectedCompetition = expectedCompetitionWithDefaultValues;
        const competition = createCompetitionFromJSON(jsonObject.tournament);
        metaStorage.createCompetition(competition);

        // ACT:
        const actualCompetition = metaStorage.getCompetition(competition.id);

        // ASSERT:
        expect(actualCompetition).toEqual(expectedCompetition);
    });
});

function readCompetitionFile() {
    const filePath = path.join(__dirname, config.JSON_FILE);
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

