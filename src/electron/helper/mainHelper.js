const { COMPETITION_STATE } = require("../../shared/models/competition");

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

  if (
    state === COMPETITION_STATE.COMP_READY_ROUND_READY ||
    state === COMPETITION_STATE.COMP_CREATED
  ) {
    return {
      roundStarted: false,
      tableNumber
    };
  }

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

function createUpdateSetsResponseData() {
  return {
    message: "success"
  };
}

module.exports = {
  createStateResponseData,
  createUpdateSetsResponseData
};
