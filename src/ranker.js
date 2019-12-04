function generateRanking(comepetition) {
  console.log("IN generate Ranking");
  let ranking = [];

  /*
    better solution?
    i need this because i cant forEach every player 
    while already being in a forEach of the players
    */
  let dummyData = [];
  comepetition.players.forEach(p => {
    let dummy = {
      id: p.id,
      gamesWon: p.gamesWon,
      qttr: p.qttr
    };
    dummyData.push(dummy);
  });

  //geiler Code....4x forEach gg
  comepetition.players.forEach(player => {
    let matchesInvolved = [];
    let opponentIds = [];
    let opponentTTR = [];
    let matchesSummary = [];
    let bhz = 0;
    let ttrDifference = 0;

    //get all matches this player was envolved
    player.matchesIds.forEach(id => {
      comepetition.rounds.forEach(round => {
        round.forEach(match => {
          if (match.id === id) matchesInvolved.push(match);
        });
      });
    });

    //go trough all the matches played and collect all the information needed for the FE
    matchesInvolved.forEach(match => {
      let opponentName = "";
      let ownSets = "";
      let opponentSets = "";

      if (match.player1.id === player.id) {
        opponentIds.push(match.player2.id);
        opponentName = match.player2.lastname;
        ownSets = match.result[0];
        opponentSets = match.result[1];
      } else {
        opponentIds.push(match.player1.id);
        opponentName = match.player1.lastname;
        ownSets = match.result[1];
        opponentSets = match.result[0];
      }

      let matchSummary = {
        round: match.round,
        opponentName: opponentName,
        ownSets: ownSets,
        opponentSets: opponentSets
      };
      matchesSummary.push(matchSummary);
    });
    //calculate bhz
    opponentIds.forEach(opponentId => {
      dummyData.forEach(dummyP => {
        if (opponentId === dummyP.id) {
          bhz += dummyP.gamesWon;
          opponentTTR.push(dummyP.qttr);
        }
      });
    });

    //calculate new ttr --> description at the end of script
    opponentTTR.forEach(ttr => {
      //calc Pa for each opponent
      let exp = (ttr - player.qttr) / 150;
      let n = 1 + Math.pow(10, exp);
      let Pa = 1 / n;
      Pa = parseFloat(Pa.toFixed(3));

      ttrDifference += (1 - Pa) * 16;
    });
    ttrDifference = Math.round(
      ttrDifference - (opponentTTR.length - player.gamesWon) * 16
    );

    ranking.push({
      place: 0,
      lastname: player.lastname,
      gamesWon: player.gamesWon,
      gamesLost: matchesInvolved.length - player.gamesWon,
      bhz: bhz,
      qttr: player.qttr,
      ttr_beginn: player.qttr,
      ttr_now: parseInt(player.qttr) + ttrDifference,
      ttr_diff: ttrDifference,
      matches: matchesSummary
    });
  });

  ranking.sort(function(p1, p2) {
    // Sort by gamesWon
    if (p1.gamesWon > p2.gamesWon) return -1;
    if (p1.gamesWon < p2.gamesWon) return 1;

    // If gamesWon is the same
    // -> sort for bhz
    if (p1.bhz > p2.bhz) return -1;
    if (p1.bhz < p2.bhz) return 1;

    //TODO
    // if same bhz - sort for direkter Vergleich

    //if no direkter Vergleich
    //-> schlechterer qttr hat höheren Platz
  });

  //now after the ranking is sorted
  //we can init the place by the position in ranking
  for(var i = 0 ; i < ranking.length ; i++){
    ranking[i].place = i+1;
  }

  comepetition.ranking = ranking;
}

/* Für mehr Details der ttr berechnung --> https://www.tt-spin.de/ttr-rechner/

                      1
Pa   =    ---------------------------
                (  ttr(b)- ttr(a)  )
                (  -------------   )
                (       150        )
          1 +  10                       --> Nenner = 1 + 10 ^ (dieses große ding da :))

Pa ist die Wahrscheinlichkeit für einen Sieg (irgendwas zwischen 0-1)
Um so stärker der Gegner - umso mehr Punkte gewinnt man beim Sieg
                         - umso weniger Punkte verliert man bei einer Niederlage

Anzahl der Punkte welche man erhält für einen Sieg ist --> (1 - Pa) * K  <--- Erg. wird gerundet
K = Multiplikator der Punkte welche man erreichen kann

K = 16 -> Dies gilt für Erwachsene (somit kann man 0-16 Punkte maximal gewinnen/verlieren)
K = 20 -> gilt für 16 - 21 Jährige
K = 24 -> gilt für unter 16 jährige


ES GIBT NOCH EIN PAAR WEITERE AUSNAHMEN -> TODO in Zukunft
--> Jetzt wird einfach über all die Erwachsenen Konstante K =16 genommen
   
*/

module.exports.generateRanking = generateRanking;
