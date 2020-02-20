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
}

function createMatches(matches) {
    const elementPath = "tournament.competition.matches";
    const hasMatchesFlag = storage.has(elementPath).value();

    if (!hasMatchesFlag) {
        storage.set(elementPath, matches).write();
    } else {
        matches.forEach((match) => {
            storage.get(elementPath).post(match).write();
        })
    }
}

module.exports = {
  open,
  createMatches
};
