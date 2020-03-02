/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");
const config = require("../config");

const {
  COMPETITION_STATE,
  createCompetitionFromJSON,
  updateCompetitionStatus,  } = require("../../src/shared/models/competition");

let jsonObject = null;

const {
  expectedCompetitionWithDefaultValues
} = require("./competition.test.data");

beforeAll(() => {
  readJSONObjectFromDisk();
});

describe("createCompetitionFromJSON()", () => {
  test("When_CreateNewCompetition_Expect_CompetitionIsInitializedWithDefaultValues", () => {
    // ACT: create data structure of a competition
    const competition = createCompetitionFromJSON(jsonObject);

    // ASSERT: data structure is equal to expected
    expect(competition).toEqual(expectedCompetitionWithDefaultValues);
  });
});

describe("setCompetitionStatus", () => {
  test("Set new competition state", () => {
    // ARRANGE: Create new competition
    let competition = createCompetitionFromJSON(jsonObject);

    // ACT: Set new competition state
    competition = updateCompetitionStatus(competition, COMPETITION_STATE.COMP_READY_ROUND_READY);

    // ASSERT: check the competition state
    expect(competition.state).toBe(COMPETITION_STATE.COMP_READY_ROUND_READY);
  });
});

function readJSONObjectFromDisk() {
  // Read json data from file
  const filePath = path.join(__dirname, config.JSON_FILE);
  jsonObject = JSON.parse(fs.readFileSync(filePath).toString());
}
