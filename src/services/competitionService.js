/**
 * @author Marco Goebel
 */

const ipcRenderer = window.ipcRenderer;
const { channels } = require("../shared/channels");

const competitions = [
  {
    id: 0,
    name: 'BTTV Bavarian TT-Race',
    startDate: '25.05.2019',
    playmode: 'Schweizer System'
  },
  {
    id: 1,
    name: 'BTTV Bavarian TT-Race',
    startDate: '11.08.2019',
    playmode: 'Schweizer System'
  }
];

function getAllCompetitions(callback) {
  ipcRenderer.once(channels.GET_ALL_TOURNAMENTS, (event, args) => {
    const { tournaments } = args;

    const games = tournaments.map(tournament => {
      return {
        id: tournament.id,
        date: tournament.start_date,
        system: "Schweizer System"
      };
    });

    callback(games);
  });

  ipcRenderer.send(channels.GET_ALL_TOURNAMENTS);
}

function deleteCompetition(id, callback) {
  ipcRenderer.once(channels.DELETE_TOURNAMENT, (event, args) => {
    callback();
  });

  ipcRenderer.send(channels.DELETE_TOURNAMENT, {id: id});
}

module.exports = {
  getAllCompetitions,
  deleteCompetition
};
