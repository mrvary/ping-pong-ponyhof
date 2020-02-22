/**
 * @author Marco Goebel
 */

const fs = require("fs");
const path = require("path");
const config = require("../config");

const { createCompetitionFromJSON, } = require("../../src/modules/models/competition");

let jsonObject = null;

const { expectedCompetitionWithDefaultValues } = require("./competition.test.data");

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

