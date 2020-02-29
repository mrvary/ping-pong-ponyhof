/**
 * @author Marco Goebel
 */

const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const FilePathIsUndefinedException = "file path is undefined";

function open(filePath, useInMemory) {

    // check the parameter
    if (!useInMemory && !filePath) {
        throw new Error(FilePathIsUndefinedException);
    }

    // create a low db instance
    const adapter = useInMemory ? new Memory() : new FileSync(filePath);
    return low(adapter);
}

module.exports = {
    FilePathIsUndefinedException,
    open
};