const Competition = require("./competition.js");
const fs = require("fs");

const data = fs.readFileSync("assets/tournament.json");
const json = JSON.parse(data);

// init matchmaker with player data
let players = json.tournament.competition.players.player;

const competition = new Competition(players);


//matchmaker.log();
competition.drawFirstRound();
competition.simulateRound();
competition.log();
