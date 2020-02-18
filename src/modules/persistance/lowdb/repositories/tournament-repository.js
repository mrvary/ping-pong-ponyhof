/**
 * @author Marco Goebel
 */

const tournamentDao = require("../dao/tournament-dao");

function createFile(filePath) {
  tournamentDao.open(filePath);
}

function create(tournament) {
  const data = tournamentDao.get(tournament.id);

  // if tournament is found, return error
  if (data) {
    console.log("Tournament does already exist");
    return null;
  }

  tournamentDao.create(tournament);
}

function remove(id) {
  tournamentDao.remove(id);
}

function getAll() {
  return tournamentDao.getAll();
}

function get(id) {
  return tournamentDao.get(id);
}

module.exports = {
  createFile,
  create,
  remove,
  get,
  getAll
};
