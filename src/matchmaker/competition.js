const {
  sortPlayersBy,
  separateTopFromBottomPlayers,
  updatePlayers,
  pairPlayers
} = require("./player.js");

const { createMatches } = require("./match.js");

// DRAW ROUNDS
function drawRound({ players }) {
  const isLaterRound = players[0].matchIds.length > 0;

  if (!isLaterRound) {
    return drawLaterRound(players);
  }

  return drawFirstRound(players);
}

function drawFirstRound({ players }) {
  // 1. sort players by qttr
  const sortedPlayers = sortPlayersBy(players, "qttr");

  // 2. separate top and bottom players
  const { top, bottom } = separateTopFromBottomPlayers(sortedPlayers);

  // 3. pair players together
  const pairings = pairPlayers({ top, bottom });

  // 4. create matches
  const newMatches = createMatches(pairings);

  // 5. update players
  const newPlayers = updatePlayers(newMatches);

  return { players: newPlayers, matches: newMatches };
}

function drawLaterRound({ players }) {
  // todo
}

module.exports = {
  // pubic
  drawRound,

  // private
  drawFirstRound,
  drawLaterRound
};
