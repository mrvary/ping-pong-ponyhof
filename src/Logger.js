function log(matchmaker) {
  debugger;
    console.log("Players ----------------");
    matchmaker.players.map(p => console.log(p));

    console.log("Rounds ----------------");
    matchmaker.rounds.map(r => console.log(r));
  }

  module.exports.log = log;
