/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");
const config = require("../config");

const { createCompetitionFromJSON, PLAYMODES } = require("../../src/modules/models/competition");

const expectedCompetition = {
  id: "d5lK%2BhCCjzbPE4bd9mBdQKIx1P%2FxYXr0",
  name: "BTTV Bavarian TT-Race",
  date: "2019-05-25",
  playmode: PLAYMODES.SCHWEIZER_SYSTEM
};

describe("createCompetitionFromJSON()", () => {
  test("returns the correct object", () => {
    // Read json data from file
    const data = fs.readFileSync(path.join(__dirname, config.JSON_FILE));
    const json = JSON.parse(data);

    // get competiton object from json data
    const competition = createCompetitionFromJSON(json.tournament);

    // assert object
    expect(competition).toEqual(expectedCompetition);
  })
});

