function createMatches({ pairings }) {
  let remainingPairings = pairings;

  let matches = [];
  while (remainingPairings) {
    const match = _createMatch(remainingPairings.shift());
    matches.push(match);
  }

  return matches;
}

// todo: pass round and matchId
function createMatch({ player1, player2 }, round, matchId) {
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
  createMatch,
  createMatches
};
