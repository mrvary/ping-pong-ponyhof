const Matchmaker = require("./matchmaker.js");
const fs = require("fs");

const data = fs.readFileSync("assets/tournament.json");
const json = JSON.parse(data);

// init matchmaker with player data
let players = json.tournament.competition.players.player;

const matchmaker = new Matchmaker(players);

matchmaker.log();
matchmaker.drawFirstRound();
matchmaker.log();
