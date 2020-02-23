/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");
const config = require("../config");

const {
  COMPETITION_STATUS,
  createCompetitionFromJSON,
  setCompetitionStatus,  } = require("../../src/modules/models/competition");

let jsonObject = null;

const { expectedCompetitionWithDefaultValues } = require("./competition.test.data");

beforeAll(() => {
  readJSONObjectFromDisk();
});

describe("createCompetitionFromJSON()", () => {
  test("When_CreateNewCompetition_Expect_CompetitionIsInitializedWithDefaultValues", () => {
    // ACT: create data structure of a competition
    const competition = createCompetitionFromJSON(jsonObject.tournament);

    // ASSERT: data structure is equal to expected
    expect(competition).toEqual(expectedCompetitionWithDefaultValues);
  });
});

describe("setCompetitionStatus", () => {
  test("When_CompetitionIsCreated_Expect_CompetitionIsReadyAndRoundIsReady", () => {
    // ARRANGE: Create new competition
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    const userChangedCompetition = false;
    const isCompleted = false;

    // ACT: Set competition state after import xml
    const modifiedCompetition = setCompetitionStatus(competition, userChangedCompetition, isCompleted);

    // ARRANGE: check the competition state
    expect(modifiedCompetition.status).toBe(COMPETITION_STATUS.COMP_READY_ROUND_READY);
  });

  test("When_CompetitionIsReadyAndRoundIsReady_Expect_CompetitionIsActiveAndRoundIsReady", () => {
    // ARRANGE: competition is imported and use has confirmed the competition
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    competition.status = COMPETITION_STATUS.COMP_READY_ROUND_READY;
    const userChangedCompetition = false;
    const isCompleted = false;

    // ACT: Set competition state after confirm a competition
    const modifiedCompetition = setCompetitionStatus(competition, userChangedCompetition, isCompleted);

    // ARRANGE: check the competition state
    expect(modifiedCompetition.status).toBe(COMPETITION_STATUS.COMP_ACTIVE_ROUND_READY);
  });

  test("When_CompetitionIsActiveAndRoundIsReady_Expect_CompetitionIsActiveAndRoundIsActive", () => {
    // ARRANGE: user has confirmed competition and start round
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_READY;
    const userChangedCompetition = false;
    const isCompleted = false;

    // ACT: Set competition state after starting round
    const modifiedCompetition = setCompetitionStatus(competition, isCompleted);

    // ARRANGE: check the competition state
    expect(modifiedCompetition.status).toBe(COMPETITION_STATUS.COMP_ACTIVE_ROUND_ACTIVE);
  });

  test("When_CompetitionIsActiveAndRoundIsActive_Expect_CompetitionIsActiveAndRoundIsReady", () => {
    // ARRANGE: all clients are playing their match
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_ACTIVE;
    const userChangedCompetition = false;
    const isCompleted = false;

    // ACT: Set competition state after all clients completed their match and the new round is drew
    const modifiedCompetition = setCompetitionStatus(competition, userChangedCompetition, isCompleted);

    // ARRANGE: check the competition state
    expect(modifiedCompetition.status).toBe(COMPETITION_STATUS.COMP_ACTIVE_ROUND_READY);
  });

  test("When_CompetitionIsActiveAndRoundIsActiveAndLastRound_Expect_CompetitionIsCompleted", () => {
    // ARRANGE: all clients are playing their match
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_ACTIVE;
    const userChangedCompetition = false;
    const isCompleted = true;

    // ACT: Set competition state after all clients completed their match
    //      and the last round was played
    const modifiedCompetition = setCompetitionStatus(competition, userChangedCompetition, isCompleted);

    // ARRANGE: check the competition state
    expect(modifiedCompetition.status).toBe(COMPETITION_STATUS.COMP_COMPLETED);
  });

  test("When_CompetitionIsActiveAndRoundIsReadyAndUserChangedCompetition_Expect_CompetitionIsReadyAndRoundIsReady", () => {
    // ARRANGE: all clients are playing their match
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_READY;
    const userChangedCompetition = true;
    const isCompleted = false;

    // ACT: Set competition state after after matches are drew and user changed competition
    const modifiedCompetition = setCompetitionStatus(competition, userChangedCompetition, isCompleted);

    // ARRANGE: check the competition state
    expect(modifiedCompetition.status).toBe(COMPETITION_STATUS.COMP_READY_ROUND_READY);
  });

  test("When_CompetitionIsActiveAndRoundIsActiveAndUserChangedCompetition_Expect_CompetitionIsReadyAndRoundIsActive", () => {
    // ARRANGE: all clients are playing their match
    const competition = createCompetitionFromJSON(jsonObject.tournament);
    competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_ACTIVE;
    const userChangedCompetition = true;
    const isCompleted = false;

    // ACT: Set competition state after clients playing matches and user changed competition
    const modifiedCompetition = setCompetitionStatus(competition, userChangedCompetition, isCompleted);

    // ARRANGE: check the competition state
    expect(modifiedCompetition.status).toBe(COMPETITION_STATUS.COMP_READY_ROUND_ACTIVE);
  });
});

function readJSONObjectFromDisk() {
  // Read json data from file
  const filePath = path.join(__dirname, config.JSON_FILE);
  jsonObject = JSON.parse(fs.readFileSync(filePath));
}

