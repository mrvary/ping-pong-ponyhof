/**
 * @author Marco Goebel
 */

let _storage = null;

let players = null;

function init(storage) {
    _storage = storage;
}

function getAll() {
    if (!players) {
        players = _storage.getAllPlayers();
    }

    return players;
}

function getById(id) {
    if (!players) {
        players = _storage.getAllPlayers();
    }

    return players.find(player => player.id === id);
}

function updatePlayer(updatedPlayer) {
    if (!players) {
        players = _storage.getAllPlayers();
    }

    // update player in list
    const foundIndex = players.findIndex(player => player.id === updatedPlayer.id);
    players[foundIndex] = updatedPlayer;

    // update player in storage
    _storage.updatePlayer(updatedPlayer);
    console.log("Update player in competition storage");
}

module.exports = {
    getAll,
    getById,
    updatePlayer
};

