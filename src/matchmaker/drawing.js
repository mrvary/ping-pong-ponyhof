const {
  separateTopFromBottomPlayers,
  pairPlayersRoundOne,
  groupByGamesWon,
  groupsToString
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
  // 1. create groups with equal gamesWon
  let groups = groupByGamesWon(players);

  console.log(groupsToString(groups));
}

module.exports = {
  // public
  drawRound,

  // private
  drawFirstRound,
  drawLaterRound
};
