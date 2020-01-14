const {
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
  // 1. separate top and bottom players
  const { top, bottom } = separateTopFromBottomPlayers(players);

  // 2. pair players together
  const pairings = pairPlayers({ top, bottom });

  // 3. create matches
  const newMatches = createMatches(pairings);

  //4. play matches
  //Todo - create a valid match result for each match

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
