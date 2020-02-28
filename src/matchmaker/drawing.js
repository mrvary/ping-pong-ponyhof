const {
  separateTopFromBottomPlayers,
  pairPlayersRoundOne,
  basicDrawingAlgorithm,
  advancedDrawingAlgorithm,
  emergencyDrawingAlgorithm
} = require("./drawingAlgorithms.js");

const { createMatches } = require("./match.js");

// drawRound : [players] -> [matches]
function drawRound(players) {
  const pairings =
    players[0].matchIds.length === 0
      ? drawFirstRound(players)
      : drawLaterRound(players);

  return createMatches(pairings);
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
  //if basicDrawing succeed its always correct
  const basicDrawing = basicDrawingAlgorithm(players);
  if (basicDrawing !== false) {
    return basicDrawing;
  }

  const advancedDrawing = advancedDrawingAlgorithm(players);
  if (advancedDrawing !== false) {
    return advancedDrawing;
  }

  return emergencyDrawingAlgorithm(players);
}

module.exports = {
  // public
  drawRound,

  // private
  drawFirstRound,
  drawLaterRound
};
