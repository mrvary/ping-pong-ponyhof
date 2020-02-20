/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require('lowdb/adapters/Memory');

const config = require("./config");

let storage = null;

function open(filePath) {
    const adapter = config.USE_IN_MEMORY_STORAGE ? new Memory() : new FileSync(filePath);
    storage = low(adapter);

    // Set default values (required if your JSON file is empty)
    storage.defaults({ competitions: [] }).write();
    console.log("Open storage:", filePath)
}

function createCompetition(competition) {
    // TODO: Remove Players from json after init
    const data = getCompetition(competition.id);

    // if competition is found, return error
    if (data) {
        console.log("Competition does already exist");
    }

    storage.get("competitions")
        .push(competition)
        .write();

    console.log(`Created new competition: ${competition.id}`);
}

function deleteCompetition(id) {
    storage.get("competitions")
        .remove({id: id})
        .write();

    console.log("Delete tournament with id: ", id)
}

function getAllCompetitions() {
    return storage.get("competitions").value();
}

function getCompetition(id) {
    return storage.get("competitions")
        .find({id: id})
        .value();
}

function hasCompetition(id) {
    const competition = getCompetition(id);
    return !!competition;
}

module.exports = {
    open,
    hasCompetition,
    createCompetition,
    deleteCompetition,
    getAllCompetitions,
    getCompetition };