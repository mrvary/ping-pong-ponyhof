// INIT
function createPlayersFromJSON(json) {
  // players are deeply nested in the input json
  const players = json.tournament.competition.players.player;

  return players.map(_createPlayer);
}

function _createPlayer(dataFromJSON) {
  const { id, person } = dataFromJSON;
  const { firstname, lastname, ttr } = person;
  const clubname = person['club-name'];

  return {
    id,
    firstname,
    lastname,
    clubname,
    gamesWon: 0,
    matchIds: [],
    qttr: parseInt(ttr, 10),
    active: true,
    hasFreeTicket: false
  };
}

// DRAW ROUNDS
function drawFirstRound({ players, matches }) {
  return { players, matches };
}

// UTILITY FUNCTIONS
function _sortPlayersBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

module.exports = {
  _createPlayer,
  createPlayersFromJSON,
  _sortPlayersBy
};
