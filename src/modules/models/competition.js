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
    playmode: dataFromJSON.competition["preliminary-round-playmode"],
    start_date: dataFromJSON["start-date"],
  };
}

module.exports = {
  createCompetitionFromJSON
};
