/**
 * @author Daniel Niemczyk
 */

//Algorithms for drawing first round
// pairPlayers : { top: [players], bottom: [players]} -> [{ player1: player, player2: player}]
function pairPlayersRoundOne({ top, bottom }) {
  let bottomPlayers = bottom;
  let topPlayers = top;
  let pairings = [];

  while (bottomPlayers.length !== 0) {
    const randomTopPlayer =
      topPlayers[Math.floor(Math.random() * topPlayers.length)];
    const randomBottomPlayer =
      bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

    //remove chosen players
    topPlayers = topPlayers.filter(player => player !== randomTopPlayer);
    bottomPlayers = bottomPlayers.filter(
      player => player !== randomBottomPlayer
    );

    pairings.push({
      player1: randomTopPlayer.id,
      player2: randomBottomPlayer.id
    });
  }
  return pairings;
}

// separateTopFromBottomPlayers : [players] -> { top: [players], bottom: [players]}
function separateTopFromBottomPlayers(players) {
  const sortedPlayers = sortPlayersBy(players, "qttr");
  const top = sortedPlayers.slice(0, Math.ceil(sortedPlayers.length / 2));
  const bottom = sortedPlayers.slice(Math.ceil(sortedPlayers.length / 2));
  return { top, bottom };
}

// basicDrawingAlgorithm : [players] -> [pairings]
function basicDrawingAlgorithm(players) {
  let dummyPlayers = [...players];
  let doLoopCounter = 0;
  const maxTries = 300;
  let pairingSucceeded;

  do {
    pairingSucceeded = true;

    //shuffle the players each time to get a different sorted list
    dummyPlayers = shuffle(dummyPlayers);
    dummyPlayers = sortPlayersBy(dummyPlayers, "gamesWon");

    /*check if 1. & 2. player of players played against each other
      check if 3. & 4. player of players played against each other
           ... 5. & 6. ...*/
    for (let i = 0; i < dummyPlayers.length; i = i + 2) {
      if (isRematch(dummyPlayers[i], dummyPlayers[i + 1])) {
        pairingSucceeded = false;
      }
    }
    doLoopCounter++;
  } while (pairingSucceeded === false && doLoopCounter < maxTries);

  if (pairingSucceeded) {
    return createPairingFromArray(dummyPlayers);
  }
  return false;
}

// advancedDrawing : [players] -> [pairings]
function advancedDrawingAlgorithm(players) {
  //copy the player call by value
  let dummyPlayers = JSON.parse(JSON.stringify(players));

  let currentDrawing = [];
  let doLoopCounter = 0;
  let pairingSucceeded;
  const maxTries = 300;

  do {
    pairingSucceeded = true;
    currentDrawing = [];

    //shuffle the players each time to get a different sorted list
    dummyPlayers = shuffle(dummyPlayers);
    dummyPlayers = sortPlayersBy(dummyPlayers, "gamesWon");

    for (let i = 0; i < dummyPlayers.length / 2; i++) {
      //1. get the next player
      let nextPlayer = getNextPlayer(currentDrawing, dummyPlayers);
      if (nextPlayer !== false) {
        currentDrawing.push(nextPlayer);
      } else {
        pairingSucceeded = false;
        break;
      }

      //2. get players not included to the drawing yet
      let remainingPlayers = dummyPlayers.filter(
        player => !currentDrawing.includes(player)
      );

      //3. get the opponent and check if they can play against each other
      let opponentPlayer = getNextBetterOpponent(nextPlayer, remainingPlayers);
      if (opponentPlayer !== false) {
        currentDrawing.push(opponentPlayer);
      } else {
        pairingSucceeded = false;
        break;
      }
    }
    doLoopCounter++;
  } while (pairingSucceeded === false && doLoopCounter < maxTries);

  if (pairingSucceeded) {
    return createPairingFromArray(currentDrawing);
  }
  return false;
}

// emergencyDrawingAlgorithm : [players] -> [pairings]
function emergencyDrawingAlgorithm(players) {
  let dummyPlayers = [...players];
  let pairingSucceeded;

  do {
    pairingSucceeded = true;

    //shuffle the players each time to get a different sorted list
    dummyPlayers = shuffle(dummyPlayers);
    for (let i = 0; i < dummyPlayers.length; i = i + 2) {
      if (isRematch(dummyPlayers[i], dummyPlayers[i + 1])) {
        pairingSucceeded = false;
      }
    }
  } while (pairingSucceeded == false);

  return createPairingFromArray(dummyPlayers);
}

// Help functions
// createPairingFromArray : [players] -> [pairings]
function createPairingFromArray(players) {
  let pairings = [];
  for (let i = 0; i < players.length; i = i + 2) {
    //FreeTicket player should be always player2
    if (players[i].id !== "FreeTicket") {
      pairings.push({
        player1: players[i].id,
        player2: players[i + 1].id
      });
    } else {
      pairings.push({
        player1: players[i + 1].id,
        player2: players[i].id
      });
    }
  }
  return pairings;
}

// groupByGamesWon : [players] -> [groups]
function groupByGamesWon(players) {
  /*
    if round 1 is over there are 2 groups of players (0|1 gamesWon )
    if round 2 is over there are 3 groups of players (0|1|2 gameWon)
    ...
  */
  const roundNr = players[0].matchIds.length;

  let groups = [];
  for (let i = 0; i < roundNr + 1; i++) {
    const playersWithSameAmountOfGamesWon = players.filter(
      player => player.gamesWon === i
    );

    groups.push(playersWithSameAmountOfGamesWon);
  }
  //reverser ranking so that the best players are at the beginning of the array
  groups.reverse();

  return groups;
}

//returns the next best player not included in a match
// getNextPlayer : [players] ->  player
function getNextPlayer(currentDrawing, dummyPlayers) {
  for (let i = 0; i < dummyPlayers.length; i++) {
    if (!currentDrawing.includes(dummyPlayers[i])) {
      return dummyPlayers[i];
    }
  }
  return false;
}

//this function returns the next best opponent a player hasn't played against so far
//if there is no opponent left the drawing is wrong and must be repaired
// getNextBetterOpponent : player, [players] -> player
function getNextBetterOpponent(player, remainingPlayers) {
  for (let i = 0; i < remainingPlayers.length; i++) {
    if (!isRematch(player, remainingPlayers[i])) {
      return remainingPlayers[i];
    }
  }
  return false;
}

// isRematch : [players] -> boolean
function isRematch(player1, player2) {
  //find a match where player1 and player2 were involved
  const duplicates = player1.matchIds.filter(matchId => {
    return player2.matchIds.indexOf(matchId) !== -1;
  });

  return duplicates.length !== 0;
}

// sortPlayersBy : [players] -> [players]
function sortPlayersBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

// shuffle : [a] -> [a]
function shuffle(array) {
  const TIMES = array.length;
  for (let i = 0; i < TIMES; i++) {
    const first = Math.floor(Math.random() * array.length);
    const second = Math.floor(Math.random() * array.length);
    [array[first], array[second]] = [array[second], array[first]];
  }
  return array;
}

// testDrawing : [pairing] -> boolean
function testDrawing(drawing, amountOfPlayers) {
  const playerIds = new Set();
  drawing.forEach(pairing => {
    playerIds.add(pairing.player1);
    playerIds.add(pairing.player2);
  });
  return playerIds.size === amountOfPlayers;
}

// groupsToString : [groups] -> string
function groupsToString(groups) {
  let string = "";

  groups.forEach(group => {
    if (group.length !== 0) {
      string += group[0].gamesWon + " Siege Spieler -> ";

      group.forEach(player => {
        string += player.lastname + " ";
      });
      string += "\n";
    }
  });

  return string;
}

module.exports = {
  // pubic
  pairPlayersRoundOne,
  separateTopFromBottomPlayers,
  sortPlayersBy,
  shuffle,
  groupByGamesWon,
  groupsToString,
  basicDrawingAlgorithm,
  advancedDrawingAlgorithm,
  emergencyDrawingAlgorithm,
  testDrawing
};
