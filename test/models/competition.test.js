/**
 * @author Marco Goebel
 */

const fs = require("fs");
const config = require("../config");

const Competition = require("../../src/backend/persistance/models/competition");

test("createCompetitionFromJSON()", () => {
  const expectedCompetition = {
    id: -1,
    ageGroup: Competition.AGE_GROUPS.DAMEN_HERREN,
    type: Competition.TYPES.EINZEL,
    playmode: Competition.PLAYMODES.SCHWEIZER_SYSTEM,
    startDate: "2019-05-25 13:00",
    tournamentId: -1
  };

  // Read json data from file
  const data = fs.readFileSync(config.JSON_FILE);
  const json = JSON.parse(data);

  // get competiton object from json data
  const competition = Competition.createCompetitionFromJSON(
    json.tournament.competition
  );

  // assert object
  expect(competition).toEqual(expectedCompetition);
});
