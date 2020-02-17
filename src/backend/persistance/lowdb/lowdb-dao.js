const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapters = new FileSync("./test/data/tournament.json");
const db = low(adapters);

const tournamet = db.get("tournament");
console.log(tournamet);
