// TODO: use hash?
let matchId = 0;

// createMatches : [{player1: Player, player2: Player}] -> [Match]
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
  const match = {
    id: matchId,
    player1: player1,
    player2: player2,
    sets: []
  };

  matchId++;
  return match;
}

module.exports = {
  createMatch,
  createMatches
};
