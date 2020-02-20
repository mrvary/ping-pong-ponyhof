/**
 * @author Marco Goebel
 */

const competitions = [
  {
    id: 0,
    name: 'BTTV Bavarian TT-Race',
    startDate: '25.05.2019',
    endDate: '25.05.2019',
    type: 'Einzel',
    playmode: 'Schweizer System'
  },
  {
    id: 1,
    name: 'BTTV Bavarian TT-Race',
    startDate: '11.08.2019',
    endDate: '11.08.2019',
    type: 'Doppel',
    playmode: 'Schweizer System'
  }
];

function getAllCompetitions() {
  return competitions;
}

function deleteCompetition(compId) {
  competitions.filter(competition => competition.id !== compId);
}

module.exports = {
  getAllCompetitions,
  deleteCompetition
};
