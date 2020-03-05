/**
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

function updateMatch(updatedMatch) {
  // update match in list
  /*const foundIndex = matches.findIndex(match => match.id === updatedMatch.id);
    matches[foundIndex] = updatedMatch;*/

  // update match in storage
  _storage.updateMatch(updatedMatch);
  console.log("Update match in competition storage");
}

module.exports = {
  init,

  getAll,
  getMatchesByIds,
  createMatches,
  updateMatch
};
