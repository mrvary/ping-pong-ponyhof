/**
 * @author Marco Goebel
 */

const ipcRenderer = window.electron.ipcRenderer;
const ipcChannels = require("../ipc-messages");

function createWindow(route) {
  ipcRenderer.send(ipcChannels.OPEN_NEW_WINDOW, { route: route });
}

function startRound() {
  ipcRenderer.send(ipcChannels.START_ROUND);
}

function getPlayersByPlayerId(id) {
  const players = [
    {
      id: "PLAYER1",
      firstname: "Gerhard",
      lastname: "Acker",
      clubname: "ESV SF Neuaubing",
      gamesWon: 3,
      matchIds: [0],
      qttr: 1415,
      active: true,
      hasFreeTicket: false
    },
    {
      id: "PLAYER2",
      firstname: "Achim",
      lastname: "Amthor",
      clubname: "SC Baldham-Vaterstetten ",
      gamesWon: 5,
      matchIds: [0],
      qttr: 1251,
      active: true,
      hasFreeTicket: false
    },
    {
      id: "PLAYER3",
      firstname: "Ulrich",
      lastname: "Dietzel",
      clubname: "TTC Friedberg ",
      gamesWon: 1,
      matchIds: [1],
      qttr: 1111,
      active: true,
      hasFreeTicket: false
    }
  ];

  return players.filter(player =>
    player.matchIds.some(matchId => matchId === id)
  );
}

module.exports = {
  // windows
  createWindow,

  // Trigger
  startRound,
};
