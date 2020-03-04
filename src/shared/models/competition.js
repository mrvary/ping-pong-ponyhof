/**
 * @author Marco Goebel
 */

// Constants
const PLAYMODE = require("./competition-playmode");
const COMPETITION_STATE = require("./competition-state");

const { createRound } = require("./round");

/**
 * createCompetitionFromJSON: dataFromJSON -> Competition
 */
function createCompetitionFromJSON(jsonObject) {
  const tournament = jsonObject.tournament;
  return createCompetition(tournament);
}

function createCompetition(dataFromJSON) {
  return {
    id: dataFromJSON["tournament-id"],
    name: dataFromJSON["name"],
    date: dataFromJSON["start-date"],
    playmode: dataFromJSON.competition["preliminary-round-playmode"],
    currentRound: 1,
    rounds: [],
    state: COMPETITION_STATE.COMP_CREATED
  };
}

function setCompetitionRoundMatches(competition, roundNumber, matches) {
  const round = createRound(roundNumber, matches);
  return { ...competition, rounds: [...competition.rounds, round] };
}

function setCompetitionState(competition, newStatus) {
  return { ...competition, state: newStatus };
}

module.exports = {
  PLAYMODE,
  COMPETITION_STATE,
  createCompetitionFromJSON,
  setCompetitionRoundMatches,
  setCompetitionState
};
