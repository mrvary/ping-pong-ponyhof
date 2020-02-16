/**
 * @author Marco Goebel
 */

const fs = require("fs");
const config = require("../config");

const {
  createTournamentFromJSON
} = require("../../src/backend/persistance/models/tournament");

test("createTournamentFromJSON()", () => {
  const expectedTournament = {
    id: "d5lK%2BhCCjzbPE4bd9mBdQKIx1P%2FxYXr0",
    name: "BTTV Bavarian TT-Race",
    city: "München",
    start_date: "2019-05-25",
    end_date: "2019-05-25"
  };

  // Read json data from file
  const data = fs.readFileSync(config.JSON_FILE);
  const json = JSON.parse(data);

  // get tournamet object from json data
  const tournament = createTournamentFromJSON(json.tournament);

  // assert object
  expect(tournament).toEqual(expectedTournament);
});
