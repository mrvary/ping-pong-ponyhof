function createPlayersFromJSON(json) {
  // players are deeply nested in the input json
  const players = json.tournament.competition.players.player;

  return players.map(createPlayer);
}

function createPlayer(dataFromJSON) {
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

module.exports = {
  createPlayer,
  createPlayersFromJSON
};
