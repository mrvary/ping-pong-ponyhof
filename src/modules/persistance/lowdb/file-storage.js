/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require('lowdb/adapters/Memory');

let storage = null;

function open(filePath) {
    storage = low(
        process.env.NODE_ENV === "test"
        ? new Memory()
        : new FileSync(filePath));

    // Set default values (required if your JSON file is empty)
    storage.defaults({ competitions: [] }).write();
    console.log("Open storage:", filePath)
}

function createCompetition(competition) {
    const data = getCompetition(competition.id);

    // if competition is found, return error
    if (data) {
        console.log("Competition does already exist");
        return null;
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

module.exports = { open, createCompetition, deleteCompetition, getAllCompetitions, getCompetition };