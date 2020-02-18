/**
 * @author Marco Goebel
 */

const file_storage = require("../../src/modules/persistance/lowdb/file-storage");
const config = require("../config");
const {
    createTournamentFromJSON
} = require("../../src/modules/models/tournament");
const assert = require('assert')

describe("file storage tests", () => {
    before(() => {
        process.env.NODE_ENV = 'test';
    });

    test("createTournamentEntry", () => {
        // ARRANGE: create in memory storage + load data from test file
        file_storage.open();

        const data = fs.readFileSync(config.JSON_FILE);
        const tournament = createTournamentFromJSON(JSON.parse(data));

        // ACT: create tournament entry
        file_storage.createTournament(tournament);

        // ASSERT: check the result
        const tournaments = file_storage.getTournament(tournament.id);
        assert.equal(tournaments.length, 1);
    }) ;
});

