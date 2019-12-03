function drawNextRound(competition) {

  //in rounds are the already drawed matches - when tournament starts this is empty(.length == 0)
  if (competition.rounds.length == 0) {
    drawFirstRound(competition)
  } else {
    drawSecondRound(competition)
  }

}


/*@author Daniel
  Auslosung für Runde 1 ist anders
  teile alle TN in obere Hälfte(topPlayers) und untere Hälfte(bottomPlayers)
  wenn TN-Anzahl ungerade dann soll der mittlere Spieler in die stärkere Hälfte

  hole einen zufälligen Spieler aus der oberen und unteren Hälfte und matche diese zusammen
  lösche die beiden Spieler aus dem pool der verfügbaren Spieler
  bei ungerader TN-Anzahl hat so ein zufälliger topPlayer ein freilos

  Eine Aufgabe eines Spielers sollte hier noch nicht vorhanden sein
  -> gibt dieser sofort nach der Aulosung bzw Ausrufe der Spiele auf
  so ist dieses dennoch zu werten 
*/
function drawFirstRound(competition) {
  let sortedPlayers = sortBy(competition.players, ["qttr"]);
  let matches = [];
  let updatedPlayers = [];

  let topPlayers = sortedPlayers.slice(0, Math.ceil(sortedPlayers.length / 2));
  let bottomPlayers = sortedPlayers.slice(Math.ceil(sortedPlayers.length / 2), sortedPlayers.length);


  while (bottomPlayers.length != 0) {
    const choosenBetterPlayer = topPlayers[Math.floor(Math.random() * topPlayers.length)];
    const choosenWorsePlayer = bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

    //remove choosenPlayer out of top- and bottomPlayers
    topPlayers = topPlayers.filter(player => player !== choosenBetterPlayer);
    bottomPlayers = bottomPlayers.filter(player => player !== choosenWorsePlayer);

    updatedPlayers.push({
      ...choosenBetterPlayer,
      matchesIds: choosenBetterPlayer.matchesIds.concat(competition.matchId)
    });

    updatedPlayers.push({
      ...choosenWorsePlayer,
      matchesIds: choosenWorsePlayer.matchesIds.concat(competition.matchId)
    });

    let match = {
      id: competition.matchId++,
      player1: choosenBetterPlayer,
      player2: choosenWorsePlayer,
      round: 1,
      result: [],
      sets: [],
      freeTicket: false
    };
    matches.push(match);

  }//end while

  //check for ungeradeTN -- create freilos Spiel
  if (topPlayers.length == 1) {

    updatedPlayers.push({
      ...topPlayers[0],
      matchesIds: topPlayers[0].matchesIds.concat(competition.matchId)
    });

    let match = {
      id: competition.matchId++,
      player1: topPlayers[0],
      player2: null,
      round: 1,
      result: [],
      sets: [],
      freeTicket: true
    };
    matches.push(match);
  }

  competition.players = updatedPlayers;
  competition.rounds.push(matches);
}

//gl hf 
function drawSecondRound(competition) {

  /*OLD CODE START-------------------
  
  var doLoopCounter = 0;
  var success = false;
      ranking = [];
  
      do {
        doLoopCounter++;
          var error = false;
          
          ranking = getRanking(standing);
          
          for (var i = 0; i < standing.length; i = i + 2) {
            if (!checkIfCanPlayVsEachOther(ranking[i], ranking[i + 1])) {
              error = true;
            }
          }
          
          if (error == false) {
            success = true;
          }
        } while (error == true && doLoopCounter < 500);
        
        var drawResultBasic = {
          "doLoopCounter": doLoopCounter
        }
        
        if (success) {
          drawResultBasic.success = true;
          drawResultBasic.playerlist = ranking;
        } else {
          drawResultBasic.success = false;
        }
        return drawResultBasic;
        
        OLD CODE END---------------
        */


  // competition.players = updatedPlayers;
  // competition.rounds.push(matches);
  let matches = [];
  let updatedPlayers = [];
  let players = [];

  competition.players.forEach(element => {
    //call by value
    players.push(element);
  });

  players = shuffle(players);
  let sortedPlayers = sortBy(players, ["gamesWon"]);

  while (sortedPlayers.length >= 2) {
    var choosenBetterPlayer = sortedPlayers.shift();
    var choosenWorsePlayer = sortedPlayers.shift();

    updatedPlayers.push({
      ...choosenBetterPlayer,
      matchesIds: choosenBetterPlayer.matchesIds.concat(competition.matchId)
    });

    updatedPlayers.push({
      ...choosenWorsePlayer,
      matchesIds: choosenWorsePlayer.matchesIds.concat(competition.matchId)
    });

    let match = {
      id: competition.matchId++,
      player1: choosenBetterPlayer,
      player2: choosenWorsePlayer,
      round: competition.rounds.length + 1,
      result: [],
      sets: [],
      freeTicket: false
    };
    matches.push(match);
  }

  if (sortedPlayers.length == 1) {
    updatedPlayers.push({
      ...sortedPlayers[0],
      matchesIds: sortedPlayers[0].matchesIds.concat(competition.matchId)
    });

    let match = {
      id: competition.matchId++,
      player1: updatedPlayers[0],
      player2: null,
      round: competition.rounds.length + 1,
      result: [],
      sets: [],
      freeTicket: true
    };
    matches.push(match);
  }

  competition.players = updatedPlayers;
  competition.rounds.push(matches);

}


function sortBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

function shuffle(e) {
  for (let i = e.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [e[i], e[j]] = [e[j], e[i]];
  }
  return e;
}


module.exports.drawNextRound = drawNextRound;