const { COMPETITION_STATE } = require("../../shared/models/competition");

function createStateResponseData(
  tableNumber,
  currentCompetition,
  matchesWithPlayers
) {
  if (currentCompetition) {
    const { state } = currentCompetition;
    const { match } = matchesWithPlayers.find(
      matchWithPlayers => matchWithPlayers.tableNumber === tableNumber
    );

    if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
      return {
        roundStarted: false,
        tableNumber,
        match: match
      };
    }

    if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
      return {
        roundStarted: true,
        tableNumber,
        match: match
      };
    }
  }

  return {
    roundStarted: false,
    tableNumber
  };
}

module.exports = {
  createStateResponseData
};
