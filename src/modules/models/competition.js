/**
 * @author Marco Goebel
 */

// Constants
const PLAYMODES = { SCHWEIZER_SYSTEM: "Schweizer System" };

/**
 * createCompetitionFromJSON: dataFromJSON -> Competition
 */
 function createCompetitionFromJSON(dataFromJSON) {
    return {
        id: dataFromJSON["tournament-id"],
        name: dataFromJSON["name"],
        date: dataFromJSON["start-date"],
        playmode: dataFromJSON.competition["preliminary-round-playmode"],
    };
}

module.exports = {
    PLAYMODES,

    createCompetitionFromJSON
};
