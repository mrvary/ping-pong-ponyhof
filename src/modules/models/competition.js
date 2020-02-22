/**
 * @author Marco Goebel
 */

// Constants
const PLAYMODE = { SCHWEIZER_SYSTEM: "Schweizer System" };
const STATUS = {COMPETITION_START: "Competition_Start", ROUND_STARTED: "Round-Started", ROUND_COMPLETED: "Round-Completed", COMPETITION_FINISHED: "Competition-Finished"};

/**
 * createCompetitionFromJSON: dataFromJSON -> Competition
 */
 function createCompetitionFromJSON(dataFromJSON) {
    return {
        id: dataFromJSON["tournament-id"],
        name: dataFromJSON["name"],
        date: dataFromJSON["start-date"],
        playmode: dataFromJSON.competition["preliminary-round-playmode"],
        round_matchIds: [],
        status: STATUS.COMPETITION_START
    };
}

module.exports = {
    PLAYMODE,
    STATUS,
    createCompetitionFromJSON
};
