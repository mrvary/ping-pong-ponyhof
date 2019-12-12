function createPlayers(json) {
  // players are deeply nested in the input json
  const players = json.tournament.competition.players.player;

  return players.map(createPlayer);
}

function createPlayer(dataFromJSON) {
  const { id, person } = player;
  const { firstname, lastname, ttr } = person;
  const clubname = person['club-name'];

  return {
    id,
    firstname,
    lastname,
    clubname,
    gamesWon: 0,
    matchesIds: [],
    qttr: ttr,
    active: true,
    hasFreeTicket: false
  };
}

module.exports = {
  createPlayer
};
