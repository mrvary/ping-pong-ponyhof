function drawNextRound(competition) {
  //in rounds are the already drawed matches - when tournament starts this is empty(.length === 0)
  if (competition.rounds.length === 0) {
    drawFirstRound(competition);
  } else {
   // drawTestF(competition);
    drawSecondRound(competition);
  }
}

/*@author Daniel
  Auslosung für Runde 1 ist anders

  Eine Aufgabe eines Spielers sollte hier noch nicht vorhanden sein
  -> gibt dieser sofort nach der Aulosung bzw Ausrufe der Spiele auf
  so ist dieses dennoch zu werten 
*/
function drawFirstRound(competition) {
  let sortedPlayers = sortBy(competition.players, ["qttr"]);
  let matches = [];
  let updatedPlayers = [];

  //teile alle TN in obere Hälfte(topPlayers) und untere Hälfte(bottomPlayers)
  //wenn TN-Anzahl ungerade dann soll der mittlere Spieler in die stärkere Hälfte
  let topPlayers = sortedPlayers.slice(0, Math.ceil(sortedPlayers.length / 2));
  let bottomPlayers = sortedPlayers.slice(
    Math.ceil(sortedPlayers.length / 2),
    sortedPlayers.length
  );

  /*
  hole einen zufälligen Spieler aus der oberen und unteren Hälfte und matche diese zusammen
  lösche die beiden Spieler aus dem pool der verfügbaren Spieler (top/bottom -Players)
  */
  while (bottomPlayers.length !== 0) {
    const choosenBetterPlayer =
      topPlayers[Math.floor(Math.random() * topPlayers.length)];
    const choosenWorsePlayer =
      bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

    //remove choosenPlayer out of top- and bottomPlayers
    topPlayers = topPlayers.filter(player => player !== choosenBetterPlayer);
    bottomPlayers = bottomPlayers.filter(
      player => player !== choosenWorsePlayer
    );

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
  } //end while

  //check for ungeradeTN -- create freilos Spiel for the one player left in topPlayers
  if (topPlayers.length === 1) {
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



 /*@author Daniel
  try different type of drawings first




  */
function drawSecondRound(competition) {
 
  let players = [];

  competition.players.forEach(element => {
    //call by value
    players.push(element);
  });

  players = shuffle(players);
  let sortedPlayers = sortBy(players, ["gamesWon"]);

  createMatches(sortedPlayers,competition);

  debugger;
}

function createMatches(playerList, competition){
  let matches = [];
  let updatedPlayers = [];

  while (playerList.length >= 2) {
    let choosenBetterPlayer = playerList.shift();
    let choosenWorsePlayer = playerList.shift();

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

  //case of ungeradeTN = freilosSpiel
  if (playerList.length === 1) {
    updatedPlayers.push({
      ...playerList[0],
      matchesIds: playerList[0].matchesIds.concat(competition.matchId)
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


function drawTestF(competition) {
  console.log("-------TETSTTSSs---------------");

  //ranking contains multiple playersWithSameAmountOfGamesWon Arrays
  //!!THIS IS STILL CALL BY REFERENCE
  let gamesWonGroups = createGamesWonGroups(competition.players, competition.rounds.length);
  printGroups(gamesWonGroups);


  if (competition.rounds.length === 4) {
    debugger;

  }


}

//sort our playerArray by gamesWon f.ex
function sortBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

//randomize the position of the elements within an array
function shuffle(e) {
  for (let i = e.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [e[i], e[j]] = [e[j], e[i]];
  }
  return e;
}

function createGamesWonGroups(allPlayers, roundNr) {
  /*
    if round 1 is over there are 2 grups of players (0|1 gamesWon )
    if round 2 is over there are 3 grups of players (0|1|2 gameWon)
    ...
  */

  let groups = [];
  for (var i = 0; i < roundNr + 1; i++) {
    let playersWithSameAmountOfGamesWon = [];

    allPlayers.forEach(player => {
      if (player.gamesWon === i) playersWithSameAmountOfGamesWon.push(player);
    });
    groups.push(playersWithSameAmountOfGamesWon);
  }
  //reverser ranking in order that 0 point players are at the bottom of the log
  groups.reverse();

  return groups;
}


function printGroups(gamesWonGroups) {
  gamesWonGroups.forEach(group => {

    if (group.length !== 0) {
      let string = group[0].gamesWon + " Siege Spieler -> ";

      group.forEach(player => {
        string += player.lastname + " ";
      });

      console.log(string);
    }
  });
}


module.exports.drawNextRound = drawNextRound;