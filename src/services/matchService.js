const { matches0, matches1 } = require('../../test/matchmaker/match.test.data');

function getMatchesByCompetition(compId) {
  if (compId === 0) return matches0;
  else return matches1;
}

module.exports = {
  getMatchesByCompetition
};
