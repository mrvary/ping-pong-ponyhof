// createPlayersFromJSON : JSON -> [players]
function createPlayersFromJSON(json) {
  // players are deeply nested in the input json
  const initPlayers = json.tournament.competition.players.player;
  let players = initPlayers.map(createPlayer);

  //add freeticket player when odd number of players
  if (players.length % 2 === 1) {
    players.push({
      id: "FreeTicket",
      gamesWon: 0,
      matchIds: [],
      opponentIds: [],
      qttr: 0
    });
  }

  return players;
}

// createPlayer : playerFromJSON -> Player
function createPlayer(dataFromJSON) {

  const { id, person } = dataFromJSON;
  const { firstname, lastname, ttr } = person;
  const clubname = person["club-name"];

  return {
    id,
    firstname,
    lastname,
    clubname,
    gamesWon: 0,
    matchIds: [],
    opponentIds: [],
    qttr: parseInt(ttr, 10),
    active: true,
    hadFreeTicketAlready: false
  };
}


// sortPlayersBy : [players] -> [players]
function sortPlayersBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}


// ToDo
function updatePlayers() {

}

module.exports = {
  // pubic
  createPlayersFromJSON,

  // private
  createPlayer,
  sortPlayersBy,
  updatePlayers
};
