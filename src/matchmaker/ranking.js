// calculateBHZ : [players], [matches] -> [rankning]
function createCurrentRanking(players, matches) {
  let ranking = [];

  players.forEach(player => {
    const ttrDifference = calculateTTRDifference(player, players);
    ranking.push({
      place: 0,
      id: player.id,
      firstname: player.firstname,
      lastname: player.lastname,
      gamesWon: player.gamesWon,
      gamesLost: player.matchIds.length - player.gamesWon,
      bhz: calculateBHZ(player, players),
      qttr: player.qttr,
      //ttr_begin: player.ttr,
      ttr_now: player.qttr + ttrDifference,
      ttr_diff: ttrDifference,
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

  //after the ranking is sorted the place can be set by the position in ranking
  for (let i = 0; i < ranking.length; i++) {
    ranking[i].place = i + 1;
  }
  return ranking;
}

// calculateBHZ : player, [matches] -> bhz
function calculateBHZ(playerToCalculate, players) {
  let bhz = 0;
  //bhz = the sum of all games your opponents you have played against have won
  players.forEach(player => {
    if (playerToCalculate.opponentIds.includes(player.id)) {
      bhz += player.gamesWon;
    }
  });
  return bhz;
}

// calculateTTRDifference : playerToCalculate, [players] -> Number
function calculateTTRDifference(playerToCalculate, players) {
  //1. get all "real" opponents
  const opponents = playerToCalculate.opponentIds.filter(
    opponentId => opponentId !== "FreeTicket"
  );

  //2. get of all opponents their ttr value
  let opponentTTR = [];
  players.forEach(player => {
    if (opponents.includes(player.id)) {
      //ToDo in future use player.ttr
      opponentTTR.push(player.qttr);
    }
  });

  //3. calculate ttrDifference
  let ttrDifference = ttrCalculation(
    playerToCalculate.qttr,
    opponentTTR,
    playerToCalculate.gamesWon
  );

  //5. check for Freeticket games
  if (opponents.length !== playerToCalculate.opponentIds.length)
    ttrDifference -= 16;

  return ttrDifference;
}

//for a detailed explanation go to --> https://www.tt-spin.de/ttr-rechner/
// ttrCalculation : Player, [Numbers], Number -> Number
function ttrCalculation(ttrPlayer, ttrOpponnents, gamesWon) {
  let ttrDifference = 0;
  ttrOpponnents.forEach(ttr => {
    // calc Pa for each opponent
    let exp = (ttr - ttrPlayer) / 150;
    let n = 1 + Math.pow(10, exp);
    let Pa = 1 / n;
    Pa = parseFloat(Pa.toFixed(3));
    ttrDifference += (1 - Pa) * 16;
  });

  // calculate ttr difference
  ttrDifference = Math.round(
    ttrDifference - (ttrOpponnents.length - gamesWon) * 16
  );
  return ttrDifference;
}

// getMatchesInvolved : [Numbers], [matches] -> [matches]
function getMatchesInvolved(player, matches) {
  let mactchesInvolved = [];
  matches.forEach(match => {
    if (player.matchIds.includes(match.id)) {
      let opponentFirstname = "";
      let opponentLastname = "";
      let matchResult = createMatchResult(match);
      if (match.player1.id === player.id) {
        opponentFirstname = match.player2.firstname;
        opponentLastname = match.player2.lastname;
        ownSets = matchResult.player1;
        opponentSets = matchResult.player2;
      } else {
        opponentFirstname = match.player1.firstname;
        opponentLastname = match.player1.lastname;
        ownSets = matchResult.player2;
        opponentSets = matchResult.player1;
      }

      let finalMatch = {
        opponentFirstname: opponentFirstname,
        opponentLastname: opponentLastname,
        ownSets: ownSets,
        opponentSets: opponentSets
      };
      mactchesInvolved.push(finalMatch);
    }
  });

  return mactchesInvolved;
}

// createMatchResult : match -> JSON
function createMatchResult(match) {
  let player1SetsWon = 0;
  let player2SetsWon = 0;

  match.sets.forEach(set => {
    //player1 has more points
    if (set.player1 - 1 > set.player2 && set.player1) {
      player1SetsWon++;
    }
    //player2 has more points
    if (set.player1 < set.player2 - 1) {
      player2SetsWon++;
    }
  });

  return { player1: player1SetsWon, player2: player2SetsWon };
}

// logRanking : [ranking] -> console.log(ranking)
function logRanking(ranking) {
  let log =
    "Platz\tName\t\tS:N\tBHZ\tTTR-Start\tTTR-Aktuell\tTTR-Diff\t" +
    "|\t1.Runde\t\t2.Runde\t\t3.Runde\t\t4.Runde\t\t5.Runde\t\t6.Runde\n";

  ranking.forEach(player => {
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
      "\t\t|\t";

    // create for each match a summary -> Krause 3:0
    player.matches.forEach(match => {
      log += match.opponentLastname + " ";
      log += match.ownSets + ":";
      log += match.opponentSets + "\t";
    });
    log += "\n";
  });
  console.log(log);
}

module.exports = {
  createCurrentRanking,
  calculateBHZ,
  calculateTTRDifference,
  getMatchesInvolved,
  logRanking,
  createMatchResult,
  ttrCalculation
};
