/**
 * @author Marco Goebel
 */

const file_storage = require("../../src/modules/persistance/lowdb/file-storage");
const config = require("../config");
const {
    createCompetitionFromJSON
} = require("../../src/modules/models/competition");
const assert = require('assert')

describe("file storage tests", () => {
    test("createTournamentEntry", () => {
        // ARRANGE: create in memory storage + load data from test file
        file_storage.open();

        const data = fs.readFileSync(config.JSON_FILE);
        const tournament = createCompetitionFromJSON(JSON.parse(data));

        // ACT: create tournament entry
        file_storage.createCompetition(tournament);

        // ASSERT: check the result
        const tournaments = file_storage.getCompetition(tournament.id);
        assert.equal(tournaments.length, 1);
    }) ;
});

