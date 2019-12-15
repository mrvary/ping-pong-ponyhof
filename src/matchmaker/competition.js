const {
  _sortPlayersBy,
  _separateTopFromBottomPlayers,
  _updatePlayers,
  _pairPlayers
} = require("./player.js");

// DRAW ROUNDS
function drawRound({ players }) {
  const isLaterRound = players[0].matchIds.length > 0;

  if (!isLaterRound) {
    return _drawLaterRound(players);
  }

  return _drawFirstRound(players);
}

function _drawFirstRound({ players }) {
  // 1. sort players by qttr
  const sortedPlayers = _sortPlayersBy(players, "qttr");

  // 2. separate top and bottom players
  const { top, bottom } = _separateTopFromBottomPlayers(sortedPlayers);

  // 3. pair players together
  const pairings = _pairPlayers({ top, bottom });

  // 4. create matches
  const newMatches = _createMatches(pairings);

  // 5. update players
  const newPlayers = _updatePlayers(newMatches);

  return { players: newPlayers, matches: newMatches };
}

function _drawLaterRound({ players }) {
  // todo
}

function _createMatches({ pairings }) {
  let remainingPairings = pairings;

  let matches = [];
  while (remainingPairings) {
    const match = _createMatch(remainingPairings.shift());
    matches.push(match);
  }

  return matches;
}

// todo: pass round and matchId
function _createMatch({ player1, player2 }, round, matchId) {
  // early return when no second player
  if (!player2) {
    const freeTicketMatch = {
      id: matchId,
      player1: { ...player1, matchIds: player1.matchIds.concat(matchId) },
      round,
      result: [],
      sets: [],
      freeTicket: true
    };
    return freeTicketMatch;
  }

  const match = {
    id: matchId,
    player1: { ...player1, matchIds: player1.matchIds.concat(matchId) },
    player2: { ...player2, matchIds: player2.matchIds.concat(matchId) },
    round,
    result: [],
    sets: [],
    freeTicket: false
  };

  return match;
}

module.exports = {
  // pubic
  drawRound,

  // private
  _drawFirstRound,
  _drawLaterRound
};
