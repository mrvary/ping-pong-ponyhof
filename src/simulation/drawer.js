function drawNextRound(competition) {
  //in rounds are the already drawed matches - when tournament starts this is empty(.length === 0)
  if (competition.rounds.length === 0) {
    drawFirstRound(competition);
  } else {
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
  let playerList = [];
  let sortedPlayers = sortBy(competition.players, ["qttr"]);

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
    //get random player from each list
    const choosenBetterPlayer =
      topPlayers[Math.floor(Math.random() * topPlayers.length)];
    const choosenWorsePlayer =
      bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

    //remove choosenPlayer out of top- and bottomPlayers
    topPlayers = topPlayers.filter(
      player => player !== choosenBetterPlayer);
    bottomPlayers = bottomPlayers.filter(
      player => player !== choosenWorsePlayer
    );

    playerList.push(choosenBetterPlayer);
    playerList.push(choosenWorsePlayer);

  }

  //check for ungeradeTN -- this will be the last player in playerList
  if (topPlayers.length === 1) {
    playerList.push(topPlayers[0])
  };

  createMatches(playerList, competition);
}

function drawSecondRound(competition) {

  let players = [];

  competition.players.forEach(element => {
    //call by value
    players.push({
      ...element
    });
  });
  
 //schaue ob array a und b ein gemeinsames Element haben
 //kann benutzt werden um zu schauen ob sie
 //bereits gegeneinander gespielt haben
 //a.some(e => b.includes(e))
 

  players = shuffle(players);
  let sortedPlayers = sortBy(players, ["gamesWon"]);

  createMatches(sortedPlayers, competition);

}

function createMatches(playerList, competition) {
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
      matchesIds: playerList[0].matchesIds.concat(competition.matchId),
      freeTicketGame: true
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
  for (let i = 0; i < roundNr + 1; i++) {
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