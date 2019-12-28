// TODO: use hash?
let matchId = 0;

function createMatches(pairings) {
  let remainingPairings = [...pairings];

  let matches = [];
  while (remainingPairings.length > 0) {
    const match = createMatch(remainingPairings.shift());
    matches.push(match);
  }

  return matches;
}

// createMatch : {player1: Player, player2: Player} -> Match
function createMatch({ player1, player2 }) {
  // early return when no second player
  if (!player2.id) {
    const freeTicketMatch = {
      id: matchId,
      player1: { ...player1, matchIds: player1.matchIds.concat(matchId) },
      sets: [],
      freeTicket: true
    };
    matchId++;
    return freeTicketMatch;
  }

  const match = {
    id: matchId,
    player1: { ...player1, matchIds: player1.matchIds.concat(matchId) },
    player2: { ...player2, matchIds: player2.matchIds.concat(matchId) },
    sets: [],
    freeTicket: false
  };

  matchId++;
  return match;
}

module.exports = {
  createMatch,
  createMatches
};
