/**
 * @author Marco Goebel
 */

const { PLAYMODE, COMPETITION_STATE } = require("../../src/modules/models/competition");

const expectedCompetitionWithDefaultValues = {
    id: "d5lK%2BhCCjzbPE4bd9mBdQKIx1P%2FxYXr0",
    name: "BTTV Bavarian TT-Race",
    date: "2019-05-25",
    playmode: PLAYMODE.SCHWEIZER_SYSTEM,
    round_matchIds: [],
    status: COMPETITION_STATE.COMP_CREATED
};

const expectedUpdatedCompetition = {
    id: "d5lK%2BhCCjzbPE4bd9mBdQKIx1P%2FxYXr0",
    name: "BTTV Bavarian TT-Race",
    date: "2019-05-25",
    playmode: PLAYMODE.SCHWEIZER_SYSTEM,
    round_matchIds: [0, 1, 2, 3, 4, 5],
    status: COMPETITION_STATE.COMP_READY_ROUND_ACTIVE
};

const expectedAllCompetitions = [
    {
        id: "tzhi3341414",
        name: "Test1",
        date: "2018-05-20",
        playmode: PLAYMODE.SCHWEIZER_SYSTEM,
        round_matchIds: [],
        status: COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
    },
    {
        id: "jtoindo3ß1%",
        name: "Test2",
        date: "2018-05-22",
        playmode: PLAYMODE.SCHWEIZER_SYSTEM,
        round_matchIds: [0, 1, 2, 3, 4, 5],
        status: COMPETITION_STATE.COMP_READY_ROUND_READY
    }
];

module.exports = {
    expectedCompetitionWithDefaultValues,
    expectedUpdatedCompetition,
    expectedAllCompetitions
};
