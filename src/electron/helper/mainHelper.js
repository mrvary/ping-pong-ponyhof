const { COMPETITION_STATE } = require("../../modules/models/competition");

function createStateResponseData({ tableNumber, selectedCompetition }) {
  if (!selectedCompetition) {
    return {
      roundStarted: false,
      tableNumber
    };
  }

  const { competition, matchesWithPlayers } = selectedCompetition;
  const { state } = competition;
  const { match } = matchesWithPlayers.find(
    matchesWithPlayers => matchesWithPlayers.tableNumber === tableNumber
  );

  if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
    return {
      roundStarted: false,
      tableNumber,
      match: match
    };
  }

  if (
    state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
    state === COMPETITION_STATE.COMP_READY_ROUND_ACTIVE
  ) {
    return {
      roundStarted: true,
      tableNumber,
      match: match
    };
  }
}

function createUpdateSetsResponseData() {}

module.exports = {
  createStateResponseData,
  createUpdateSetsResponseData
};
