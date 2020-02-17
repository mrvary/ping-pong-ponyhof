/**
 * @author Marco Goebel
 */

// Constants
const PLAYMODES = { SCHWEIZER_SYSTEM: "Schweizer System" };
const TYPES = { EINZEL: "Einzel" };
const AGE_GROUPS = { DAMEN_HERREN: "Damen/Herren" };

// createCompetitionFromJSON: competitionFromJSON -> Competition
function createCompetitionFromJSON(dataFromJSON) {
  return {
    id: -1,
    ageGroup: dataFromJSON["age-group"],
    type: dataFromJSON["type"],
    playmode: dataFromJSON["preliminary-round-playmode"],
    startDate: dataFromJSON["start-date"],
    tournamentId: -1
  };
}

module.exports = {
  PLAYMODES,
  TYPES,
  AGE_GROUPS,
  createCompetitionFromJSON
};