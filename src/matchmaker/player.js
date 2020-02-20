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
      lastname: "FREILOS",
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
    active: true
  };
}

// sortPlayersBy : [players] -> [players]
function sortPlayersBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

/*
this function is just for testing - later the update function will be in our DB
it updates the players matchIds and opponentIds
and a random player gets gameWon++
*/

// updatePlayers : [players], [matches] -> [players]
function updatePlayers(players, matches) {
  matches.forEach(match => {
    if (!isFreeticketPlayerInMatch(match)) {
      // 0 -> player1 wins, 1 -> player2 wins
      let rnd = Math.floor(Math.random() * 2);
      players.forEach(player => {
        if (match.player1 === player.id) {
          player.opponentIds.push(match.player2);
          player.matchIds.push(match.id);
          if (rnd === 0) {
            player.gamesWon++;
          }
        }
        if (match.player2 === player.id) {
          player.opponentIds.push(match.player1);
          player.matchIds.push(match.id);
          if (rnd === 1) {
            player.gamesWon++;
          }
        }
      });
    } else {
      players.forEach(player => {
        if (player.id === match.player1 && player.id !== "FreeTicket") {
          player.opponentIds.push(match.player2);
          player.matchIds.push(match.id);
          player.gamesWon++;
        }
        if (player.id === match.player2 && player.id !== "FreeTicket") {
          player.opponentIds.push(match.player1);
          player.matchIds.push(match.id);
          player.gamesWon++;
        }

        if (player.id === match.player1 && player.id === "FreeTicket") {
          player.opponentIds.push(match.player2);
          player.matchIds.push(match.id);
        }
        if (player.id === match.player2 && player.id === "FreeTicket") {
          player.opponentIds.push(match.player1);
          player.matchIds.push(match.id);
        }
      });
    }
  });

  return players;
}

// isFreeticketPlayerInMatch : [match] -> [boolean]
function isFreeticketPlayerInMatch(match) {
  if (match.player1 === "FreeTicket" || match.player2 === "FreeTicket")
    return true;
  else return false;
}

module.exports = {
  // pubic
  createPlayersFromJSON,

  // private
  createPlayer,
  sortPlayersBy,
  updatePlayers
};
