function log(competition) {
  console.log("Players ----------------");
  competition.players.map(p => console.log(p));

  console.log("Rounds ----------------");
  competition.rounds.map(r => console.log(r));
  console.log("-------------------------------");
}

function logRanking(competition) {
  console.log("ttt");
  let ranking = competition.ranking;
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

function logGamesWonGroups(competition) {
  console.log("Groups After Round " + competition.rounds.length);

  let sortedPlayers = sortBy(competition.players, "gamesWon");

  //ranking contains multiple playersWithSameAmountOfGamesWon Arrays
  let ranking = [];

  /*
    if round 1 is over there are 2 grups of players (0|1 gamesWon )
    if round 2 is over there are 3 grups of players (0|1|2 gameWon)
    ...
  */
  for (var i = 0; i < competition.rounds.length + 1; i++) {
    let playersWithSameAmountOfGamesWon = [];

    //group players that have the same gamesWon togehter in array ranking
    sortedPlayers.forEach(player => {
      if (player.gamesWon === i) playersWithSameAmountOfGamesWon.push(player);
    });
    //This is call by value (right?)
    ranking.push(playersWithSameAmountOfGamesWon);
  }

  //reverser ranking in order that 0 point players are at the bottom of the log
  ranking.reverse();

  ranking.forEach(playersWithSameGamesWon => {
    //if there is a group there must be a player at [0] to get the gamesWon  <--- wrong, can be empty..
    //solution
    if (playersWithSameGamesWon.length !== 0)
      console.log(groupToString(playersWithSameGamesWon));
  });
  console.log("-------------------------------");
}

// format -> (AnzahlSiege) Spieler1Name  3 - 2  Spieler2Name (AnzahlSiege)
function logLatestRound(competition) {
  let latestRound = competition.rounds[competition.rounds.length - 1];
  console.log("Match Ergebnisse von Runde ", competition.rounds.length);

  latestRound.forEach(match => {
    let p1 =
      "(" +
      match.player1.gamesWon +
      ")" +
      match.player1.lastname +
      " " +
      match.result[0];
    let p2 =
      match.result[1] +
      "  " +
      match.player2.lastname +
      " (" +
      match.player2.gamesWon +
      ")";
    console.log(p1 + " - " + p2);
  });
  console.log("-------------------------------");
}

function groupToString(playersWithSameGamesWon) {
  let string = "";
  string += playersWithSameGamesWon[0].gamesWon + " Siege Spieler -> ";
  playersWithSameGamesWon.forEach(player => {
    string += player.lastname + " ";
  });
  return string;
}

//TODO how to sort multiple parameter -> gameswon -> bhz -> ttr
function sortBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

module.exports.log = log;
module.exports.logGamesWonGroups = logGamesWonGroups;
module.exports.logLatestRound = logLatestRound;
module.exports.logRanking = logRanking;
