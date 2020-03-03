/**
 * @author Marco Geobel
 */

function createRound(roundNumber, matchIds) {
  return {
    round: roundNumber,
    matches: matchIds
  };
}

module.exports = {
  createRound
};
