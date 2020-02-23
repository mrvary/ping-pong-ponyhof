/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const config = require("../../../electron/config");

let storage = null;

function open(filePath) {
  if (storage) {
    return;
  }

  const adapter = config.USE_IN_MEMORY_STORAGE
    ? new Memory()
    : new FileSync(filePath);
  storage = low(adapter);

  // Set default values (required if your JSON file is empty)
  storage.defaults({ competitions: [] }).write();
  console.log("Open storage:", filePath);
}

function createCompetition(competition) {
  if (hasCompetition(competition.id)) {
    console.log("The competition already exits");
    throw new Error("Das Turnier wurde bereits angelegt.");
  }

  storage
    .get("competitions")
    .push(competition)
    .write();

  console.log(`Created new competition: ${competition.id}`);
}

function updateCompetition(competition) {
  const storedCompetition = getCompetition(competition.id);

  if (!storedCompetition) {
    createCompetition(competition);
    return;
  }

  const elementPath = "competitions";
  storage
    .get(elementPath)
    .find({ id: competition.id })
    .assign(competition)
    .write();

  console.log(`Updated competition: ${competition.id}`);
}

function deleteCompetition(id) {
  storage
    .get("competitions")
    .remove({ id: id })
    .write();

  console.log("Delete tournament with id: ", id);
}

function getAllCompetitions() {
  return storage.get("competitions").value();
}

function getCompetition(id) {
  return storage
    .get("competitions")
    .find({ id: id })
    .value();
}

function hasCompetition(id) {
  const competition = getCompetition(id);
  return !!competition;
}

module.exports = {
  open,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  getAllCompetitions,
  getCompetition
};
