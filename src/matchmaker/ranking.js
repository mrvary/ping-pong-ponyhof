const { getMatchWinner } = require("./match.js");

// calculateBHZ : [players], [matches] -> [rankning]
function createCurrentRanking(players, matches) {
  let ranking = [];

  players.forEach(player => {
    ranking.push({
      place: 0,
      lastname: player.lastname,
      gamesWon: player.gamesWon,
      gamesLost: player.matchIds.length - player.gamesWon,
      bhz: calculateBHZ(player, matches),
      qttr: player.qttr,
      //ToDo feature - live ttr
      ttr_beginn: 1000,
      ttr_now: 1123,
      ttr_diff: 123,
      matches: getMatchesInvolved(player, matches)
    });
  });

  ranking.sort(function(p1, p2) {
    // Sort by gamesWon
    if (p1.gamesWon > p2.gamesWon) return -1;
    if (p1.gamesWon < p2.gamesWon) return 1;

    // If gamesWon is equal between two players
    // -> sort for bhz
    if (p1.bhz > p2.bhz) return -1;
    if (p1.bhz < p2.bhz) return 1;

    //TODO
    // if  bhz  is equal as well
    // -> check if they played against each other

    //if they didnt play against each other
    //-> worse qttr
  });

  return ranking;
}

// logRanking : [ranking] -> console.log(ranking)
function logRanking(ranking) {
  const round = ranking[0].matches.length;
  let log = "---------Ranking after Round " + round + " --------\n";
  log +=
    "Platz\tName\t\tS:N\tBHZ\tTTR-Start\tTTR-Aktuell\tTTR-Diff\t" +
    "|\t1.Runde\t\t2.Runde\t\t3.Runde\t\t4.Runde\t\t5.Runde\t\t6.Runde\n";

  ranking.forEach(player => {
    // let matchesString = "";
    // player.matches.forEach(match => {
    //   matchesString +=
    //     match.opponentName.substring(0, 7) +
    //     " " +
    //     match.ownSets +
    //     ":" +
    //     match.opponentSets +
    //     "\t";
    // });

    log +=
      player.place +
      "\t\t" +
      player.lastname.substring(0, 7) +
      "\t\t" +
      player.gamesWon +
      ":" +
      player.gamesLost +
      "\t" +
      player.bhz +
      "\t" +
      player.qttr +
      "\t\t" +
      player.ttr_now +
      "\t\t" +
      player.ttr_diff +
      "\t\t|\t" +
      "matchesString\n";
  });
  console.log(log);
}
// calculateBHZ : player, [matches] -> bhz
function calculateBHZ(player, matches) {
  let bhz = 0;
  matches.forEach(match => {
    if (getMatchWinner(match) === player.id) bhz++;
  });
  return bhz;
}

// getMatchesInvolved : player, [matches] -> [mactchesInvolved]
function getMatchesInvolved(player, matches) {
  let mactchesInvolved = matches.filter(function(match) {
    if (match.player1 === player.id || match.player2 === player.id) return true;

    return false;
  });
  return mactchesInvolved;
}

module.exports = { createCurrentRanking, logRanking };
