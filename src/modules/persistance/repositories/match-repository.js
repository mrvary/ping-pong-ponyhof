/**
 * Helper to manage the CRUD-Operations for the matches of a competition
 * @author Marco Goebel
 */

let _storage = null;

function init(storage) {
  _storage = storage;
}

function getAll() {
  return _storage.getAllMatches();
}

function getMatchesByIds(ids) {
  return _storage.getMatchesByIds(ids);
}

function createMatches(newMatches) {
  _storage.createMatches(newMatches);
  console.log("Create matches in storage");
}

function updateMatches(matches) {
  matches.forEach(match => updateMatch(match));
}

function updateMatch(updatedMatch) {
  // update match in storage
  _storage.updateMatch(updatedMatch);
  console.log("Update match in competition storage");
}

function deleteMatches(matches) {
  _storage.deleteMatches(matches);
}

module.exports = {
  init,
  getAll,
  getMatchesByIds,
  createMatches,
  updateMatches,
  updateMatch,
  deleteMatches
};
