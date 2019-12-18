function log(competition) {
  console.log("---------Players ----------------");
  competition.players.map(p => console.log(p));

  console.log("---------Rounds ----------------");
  competition.rounds.map(r => console.log(r));
}

function logRanking(competition) {
  let ranking = competition.ranking;
  console.log("---------Ranking after Round " + competition.rounds.length + " --------")
  console.log(
    "Platz \t Name \t\tS:N\t\tBHZ\t\tTTR-Start\tTTR-Aktuell\t\tTTR-Veränderung\t|\t1.Runde\t\t\t2.Runde\t\t\t3.Runde\t\t\t4.Runde\t\t\t5.Runde\t\t\t6.Runde"
  );

  ranking.forEach(player => {
    let matchesString = "   ";
    player.matches.forEach(match => {
      matchesString +=
        match.opponentName.substring(0, 7) +
        " " +
        match.ownSets +
        ":" +
        match.opponentSets +
        "\t\t";
    });

    console.log(
      player.place +
      " \t\t" +
      player.lastname.substring(0, 7) +
      "\t\t" +
      player.gamesWon +
      ":" +
      player.gamesLost +
      "\t\t" +
      player.bhz +
      "\t\t" +
      player.qttr +
      "\t\t" +
      player.ttr_now +
      "\t\t\t" +
      player.ttr_diff +
      "\t\t\t\t|" +
      matchesString
    );
  });

}

// format -> (AnzahlSiege) Spieler1Name  3 - 2  Spieler2Name (AnzahlSiege)
function logLatestRound(competition) {
  let latestRound = competition.rounds[competition.rounds.length - 1];
  console.log("-------Match Ergebnisse von Runde ", competition.rounds.length + " --------");

  latestRound.forEach(match => {
    let p1 =
      "(" +
      match.player1.gamesWon +
      ")" +
      match.player1.lastname +
      " " +
      match.result[0];
      
    let p2 = "";
    if (!match.freeTicket) {
      p2 = match.result[1] +
        "  " +
        match.player2.lastname +
        " (" +
        match.player2.gamesWon +
        ")";
    } else {
      p2 = " freilos "
    }
    console.log(p1 + " - " + p2);
  });
}

module.exports.log = log;
module.exports.logLatestRound = logLatestRound;
module.exports.logRanking = logRanking;
