const fs = require("fs");
const drawer = require('../src/drawer');
const Competition = require("../src/competition");

const data = fs.readFileSync("assets/tournament.json");
const json = JSON.parse(data);
let players = json.tournament.competition.players.player;

const competition = new Competition(players);

//how can i test a method without return value gg...
test('drawing', () => {

    expect(competition.drawNextRound(Competition)).toBe(2);
  
});