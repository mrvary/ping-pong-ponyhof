/**
 * @author Marco Goebel
 */

function createRound(roundNumber, matches) {
  return {
    roundNumber: roundNumber,
    matchIds: matches.map(match => match.id)
  };
}

module.exports = {
  createRound
};
