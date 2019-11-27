function log(competition) {

    console.log("Players ----------------");
    competition.players.map(p => console.log(p));

    console.log("Rounds ----------------");
    competition.rounds.map(r => console.log(r));
  }

  module.exports.log = log;
