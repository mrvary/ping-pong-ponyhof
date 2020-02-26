const { COMPETITION_STATE } = require("../../modules/models/competition");

function createStateResponseData({
  tableNumber,
  competitions,
  matchesWithPlayers
}) {
  const currentlyRunningCompetition = competitions.find(
    ({ status }) =>
      status === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY ||
      status === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
  );

  if (!currentlyRunningCompetition) {
    return {
      roundStarted: false,
      tableNumber
    };
  }

  const { state } = currentlyRunningCompetition;
  const { player1, player2, match } = matchesWithPlayers[tableNumber];

  if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
    return {
      roundStarted: false,
      tableNumber,
      match: { ...match, player1, player2 }
    };
  }

  if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
    return {
      roundStarted: true,
      tableNumber,
      match: { ...match, player1, player2 }
    };
  }
}

module.exports = {
  createStateResponseData
};
