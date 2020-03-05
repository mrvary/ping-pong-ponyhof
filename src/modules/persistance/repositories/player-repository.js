/**
 * @author Marco Goebel
 */

let _storage = null;

function init(storage) {
  _storage = storage;
}

function getAll() {
  return _storage.getAllPlayers();
}

function getById(id) {
  return _storage.getPlayer(id);
}

function createPlayers(players) {
  _storage.createPlayers(players);
  console.log("Create players in storage");
}

function updatePlayers(players) {
  _storage.updatePlayers(players);
  console.log("Update players in storage");
}

function updatePlayer(updatedPlayer) {
  /*// update player in list
    const foundIndex = players.findIndex(player => player.id === updatedPlayer.id);
    players[foundIndex] = updatedPlayer;*/

  // update player in storage
  _storage.updatePlayer(updatedPlayer);
  console.log("Update player in competition storage");
}

module.exports = {
  init,

  getAll,
  getById,
  createPlayers,
  updatePlayers,
  updatePlayer
};
