/**
 * @author Marco Goebel
 */

let metaStorage = require("../lowdb/meta-storage");

function init(filePath, useInMemory) {
  metaStorage.init(filePath, useInMemory);
}

function getAllCompetitions() {
  // init competitions from database
  const competitions = metaStorage.getAllCompetitions();
  console.log(`Get ${competitions.length} competitions from repository`);

  return competitions;
}

function getCompetition(id) {
  return metaStorage.getCompetition(id);
}

function createCompetition(competition) {
  metaStorage.createCompetition(competition);
  console.log("Create competition in meta repository");
}

function updateCompetition(competition) {
  metaStorage.updateCompetition(competition);
  console.log("Update competition in meta repository");
}

function deleteCompetition(id) {
  metaStorage.deleteCompetition(id);
  console.log("Delete competition in meta repository");
}

module.exports = {
  init,

  getAllCompetitions,
  getCompetition,

  createCompetition,
  updateCompetition,
  deleteCompetition
};
