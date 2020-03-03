/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");
const config = require("../config");

const metaStorage = require("../../src/modules/persistance/lowdb/meta-storage");
const ERROR_MESSAGES = metaStorage.ERROR_MESSAGES;

const {
    expectedCompetitionWithDefaultValues,
    expectedUpdatedCompetition,
    expectedAllCompetitions
} = require("../models/competition.test.data");
const { createCompetitionFromJSON, COMPETITION_STATE } = require("../../src/shared/models/competition");

let jsonObject = null;

beforeAll(() => {
    jsonObject = readCompetitionFile();

    const filePath = null;
    const useInMemory = true;

    metaStorage.init(filePath, useInMemory);
});

describe("initStateWithDefaults()", () => {
    test("When_StorageIsEmpty_Expect_DefaultsAreInitialized", () => {
        // ARRANGE
        // init object
        const initObject = { competitions: [] };

        // expectedState
        const expectedState = { competitions: [] };

        // ACT
        metaStorage.initStateWithDefaults(initObject);

        // ASSERT:
        const actualState = metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    });
});

describe("clear()", () => {
   test("When_ExecuteMethod_Expected_OnlyContainsDefaults", () => {
       // ARRANGE
       // create test data
       const competition = createCompetitionFromJSON(jsonObject);

       // init storage with test data
       metaStorage.createCompetition(competition);

       // expected state
       const expectedState = { competitions: [] };

       // ACT
       metaStorage.clear();

       // ARRANGE:
       const actualState = metaStorage.getState();
       expect(actualState).toEqual(expectedState);
   });
});

describe("createCompetition()", () => {
    afterEach(() => {
        metaStorage.clear();
    });

    test("When_StorageDoesNotContainCompetition_Expect_CompetitionIsCreated", () => {
        // ARRANGE

        // test data
        const competition = createCompetitionFromJSON(jsonObject);

        // expected state
        const expectedState = { competitions: [ expectedCompetitionWithDefaultValues ] };

        // ACT
        metaStorage.createCompetition(competition);

        // ARRANGE: check current state
        const actualState = metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    });

    test("When_StorageDoesContainCompetition_Expect_CompetitionExistsException", () => {
        // ARRANGE

        // test data
        const competition = createCompetitionFromJSON(jsonObject);

        // init storage with test data
        metaStorage.createCompetition(competition);

        // ACT
        const method = () => { metaStorage.createCompetition(competition); };

        // ASSERT
        expect(method).toThrow(ERROR_MESSAGES.CompetitionExistsException);
    });
});

describe("updateCompetition()", () => {
    afterEach(() => {
        metaStorage.clear();
    });

    test("When_CompetitionDoesNotExists_Expect_CreateNewCompetition", () => {
        // ARRANGE
        // test data
        const competition = createCompetitionFromJSON(jsonObject);

        // expected State
        const expectedState = { competitions: [ expectedCompetitionWithDefaultValues ] };

        // ACT
        metaStorage.updateCompetition(competition);

        // ASSERT
        const actualState = metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    });

    test("When_CompetitionDoesExists_Expect_UpdateCompetitionObject", () => {
        // ARRANGE
        // expected state
        const expectedState = {competitions: [ expectedUpdatedCompetition ]};

        // create test data
        const competition = createCompetitionFromJSON(jsonObject);

        // init storage with test data
        metaStorage.createCompetition(competition);

        // ACT
        competition.round_matchIds = [ 0, 1, 2, 3, 4, 5 ];
        competition.state = COMPETITION_STATE.COMP_READY_ROUND_ACTIVE;
        metaStorage.updateCompetition(competition);

        // ASSERT
        const actualState= metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    })
});

describe("deleteCompetition()", () => {
    afterEach(() => {
        metaStorage.clear();
    });

    test("When_CompetitionDoesNotExist_Expect_DefaultState", () => {
        // ARRANGE
        // test data
        const competition = createCompetitionFromJSON(jsonObject);

        // expected State
        const expectedState = { competitions: [] };

        // init storage with test data
        metaStorage.createCompetition(competition);

        // ACT
        metaStorage.deleteCompetition(competition.id);

        // ASSERT
        const actualState = metaStorage.getState();
        expect(actualState).toEqual(expectedState);
    });
});

describe("getAllCompetitions()", () => {
    afterEach(() => {
        metaStorage.clear();
    });

   test("When_StorageContainsTwoElements_Expect_TwoElements", () => {
       // ARRANGE

       // init storage with test data
       expectedAllCompetitions.forEach(competition => {
           metaStorage.createCompetition(competition);
       })

       // ACT
       const actualCompetitions = metaStorage.getAllCompetitions();

       // ASSERT
       expect(actualCompetitions).toEqual(expectedAllCompetitions);
       expect(actualCompetitions.length).toBe(expectedAllCompetitions.length);
   })
});

describe("getCompetition()", () => {
    afterEach(() => {
        metaStorage.clear();
    });

    test("When_StorageContainsCompetition_Expect_SameCompetition", () => {
        // ARRANGE
        // init storage with test data
        const competition = createCompetitionFromJSON(jsonObject);
        metaStorage.createCompetition(competition);

        // expected array
        const expectedCompetition = expectedCompetitionWithDefaultValues;

        // ACT
        const actualCompetition = metaStorage.getCompetition(competition.id);

        // ASSERT
        expect(actualCompetition).toEqual(expectedCompetition);
    });
});

function readCompetitionFile() {
    const filePath = path.join(__dirname, config.JSON_FILE);
    const data = fs.readFileSync(filePath).toString();
    return JSON.parse(data);
}

