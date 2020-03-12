const { getMatchWinner } = require("./match.js");

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

// createPlayer : JSON -> player
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
    quitInRound: 0
  };
}

// sortPlayersBy : [players] -> [players]
function sortPlayersBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

// updatePlayersAfterDrawing : [players], [matches] -> [players]
// update player.matchIds and players.opponent after the drawing
function updatePlayersAfterDrawing(players, matches) {
  matches.forEach(match => {
    if (!isFreeticketPlayerInMatch(match)) {
      players.forEach(player => {
        if (match.player1 === player.id) {
          player.opponentIds.push(match.player2);
          player.matchIds.push(match.id);
        }
        if (match.player2 === player.id) {
          player.opponentIds.push(match.player1);
          player.matchIds.push(match.id);
        }
      });
    } else {
      players.forEach(player => {
        if (player.id === match.player1 && player.id !== "FreeTicket") {
          player.opponentIds.push(match.player2);
          player.matchIds.push(match.id);
        }
        if (player.id === match.player2 && player.id !== "FreeTicket") {
          player.opponentIds.push(match.player1);
          player.matchIds.push(match.id);
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

// updateWinner : [players], [matches] -> [players]
// get the winner of each match and gamesWon++
function updateWinner(players, matches) {
  matches.forEach(match => {
    const winnerId = getMatchWinner(match);
    players.forEach(player => {
      if (player.id === winnerId) {
        player.gamesWon++;
      }
    });
  });

  return players;
}

// isFreeticketPlayerInMatch : match -> boolean
function isFreeticketPlayerInMatch(match) {
  if (match.player1 === "FreeTicket" || match.player2 === "FreeTicket")
    return true;
  else return false;
}

module.exports = {
  createPlayersFromJSON,
  updateWinner,
  updatePlayersAfterDrawing,
  isFreeticketPlayerInMatch,
  createPlayer,
  sortPlayersBy
};
