const {
  separateTopFromBottomPlayers,
  pairPlayersRoundOne
} = require("./drawingAlgorithms.js");

const { createMatches } = require("./match.js");

// drawRound : [players] -> [matches]
function drawRound({ players }) {
  const isFirstRound = players[0].matchIds.length == 0;

  if (!isFirstRound) {
    return createMatches(drawLaterRound(players));
  }

  return createMatches(drawFirstRound(players));

}

// drawFirstRound : [players] -> [pairings]
function drawFirstRound(players) {
  // 1. separate top and bottom players
  const { top, bottom } = separateTopFromBottomPlayers(players);
  
  // 2. pair players together
  const pairings = pairPlayersRoundOne({ top, bottom });
  
  return pairings;
}

// drawLaterRound : [players] -> [pairings]
function drawLaterRound(players) {
  // todo
}

module.exports = {
  // pubic
  drawRound,

  // private
  drawFirstRound,
  drawLaterRound
};
