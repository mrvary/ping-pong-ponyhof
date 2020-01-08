const { competitions } = require('../../test/matchmaker/competition.test.data');

function getAllCompetitions() {
  return competitions;
}

function deleteCompetition(compId) {
  competitions.filter(competition => competition.id !== compId)
}

module.exports = {
  getAllCompetitions,
  deleteCompetition
};
