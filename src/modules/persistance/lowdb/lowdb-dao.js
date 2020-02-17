/**
 * @author Marco Goebel
 */

const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

let db = null;

function open(dbFilePath) {
  const adapters = new FileAsync(dbFilePath);
  db = low(adapters).then(() =>
    console.log("Open connection to file: ", dbFilePath)
  );
}

function create() {
  
}


function get(element) {}

function save() {
  ;
}
