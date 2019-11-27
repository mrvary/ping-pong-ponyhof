const Competition = require("./competition.js");
const fs = require("fs");

const data = fs.readFileSync("assets/tournament.json");
const json = JSON.parse(data);

// init matchmaker with player data
let players = json.tournament.competition.players.player;

// reduce the players size for ease of debugging - just for testing right now
const AMOUNT_OF_TOURNAMENT_PARTICIPANTS = 12;
for (let i = 0; i < 16 - AMOUNT_OF_TOURNAMENT_PARTICIPANTS; i++) {
    players.pop();
}


const competition = new Competition(players);

//matchmaker.log();
competition.drawFirstRound();
competition.simulateRound();
competition.log();
