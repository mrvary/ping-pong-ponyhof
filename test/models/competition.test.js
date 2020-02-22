/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");
const config = require("../config");

const { createCompetitionFromJSON, PLAYMODE, STATUS } = require("../../src/modules/models/competition");

let jsonObject = null;

const expectedCompetitionWithDefaultValues = {
  id: "d5lK%2BhCCjzbPE4bd9mBdQKIx1P%2FxYXr0",
  name: "BTTV Bavarian TT-Race",
  date: "2019-05-25",
  playmode: PLAYMODE.SCHWEIZER_SYSTEM,
  round_matchIds: [],
  status: STATUS.COMPETITION_START
};

describe("createCompetitionFromJSON()", () => {
  beforeAll(() => {
    readJSONObjectFromDisk();
  });

  test("init with default values", () => {
    // get competiton object from json data
    const competition = createCompetitionFromJSON(jsonObject.tournament);

    // assert object
    expect(competition).toEqual(expectedCompetitionWithDefaultValues);
  });
});

function readJSONObjectFromDisk() {
  // Read json data from file
  const filePath = path.join(__dirname, config.JSON_FILE);
  jsonObject = JSON.parse(fs.readFileSync(filePath));
}

