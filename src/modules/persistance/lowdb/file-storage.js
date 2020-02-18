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
    storage.defaults({ tournaments: [] }).write();
    console.log("Open storage:", filePath)
}

function createTournament(tournament) {
    const data = getTournament(tournament.id);

    // if tournament is found, return error
    if (data) {
        console.log("Tournament does already exist");
        return null;
    }

    storage.get("tournaments")
        .push(tournament)
        .write();

    console.log(`Created new tournament: ${tournament.id}`);
}

function deleteTournament(id) {
    storage.get("tournaments")
        .remove({id: id})
        .write();

    console.log("Delete tournament with id: ", id)
}

function getAllTournaments() {
    return storage.get("tournaments").value();
}

function getTournament(id) {
    return storage.get("tournaments")
        .find({id: id})
        .value();
}

module.exports = { open, createTournament, deleteTournament, getAllTournaments, getTournament };