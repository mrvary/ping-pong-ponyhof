/**
 * @author Marco Goebel
 */

// Constants
const PLAYMODE = { SCHWEIZER_SYSTEM: "Schweizer System" };

const COMPETITION_STATE = {
  COMP_CREATED: "comp-created",
  COMP_READY_ROUND_READY: "comp-ready-round-ready",
  COMP_READY_ROUND_ACTIVE: "comp-ready-round-active",
  COMP_ACTIVE_ROUND_READY: "comp-active-round-ready",
  COMP_ACTIVE_ROUND_ACTIVE: "comp-active-round-active",
  COMP_COMPLETED: "comp-completed"
};

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
    status: COMPETITION_STATE.COMP_CREATED
  };
}

function updateCompetitionRoundMatches(competition, matches) {
  return {...competition, round_matchIds: matches.map(match => match.id)};
}

function updateCompetitionStatus(competition, newStatus) {
  console.log(
    "Set new competition status:",
    competition.status,
    "-->",
    newStatus
  );
  return { ...competition, state: newStatus };
}

module.exports = {
  PLAYMODE,
  COMPETITION_STATE,
  createCompetitionFromJSON,
  updateCompetitionRoundMatches,
  updateCompetitionStatus
};
