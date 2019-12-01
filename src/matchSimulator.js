function simulateRound(competition) {

  //TODO
  const BETTER_PLAYER_SHOULD_WIN = false;

  //drawing for Round X already made 
  let roundNr = competition.rounds.length;
  let currentRound = competition.rounds[roundNr - 1];

  //create for every match in the round a random result and update the match result (sets)
  currentRound.forEach(match => {

  createRandomMatchResult(match);

    //get the winner out of a match and update his gamesWon
    //can be put into a seperate func as well
    let winnerId = getWinnerIdOfAGame(match);
    competition.players.forEach(player => {
      if (player.id == winnerId) {
        player.gamesWon++;
      }
    });

  });

}
/*
  create a random match Result
  update match.sets && match.result
  
  has to be refactored in future probably when we change the ways we save sets
*/
function createRandomMatchResult(match) {
  var setResults = [];

  var setsA = 0;
  var setsB = 0;

  //TODO - remove the +1 - need to be fixed in getWinnerId func first
  do {
    //create Random result from 1-15
    var setResult = Math.floor(Math.random() * 16) + 1;

    //decide on random wich player wins
    if (Math.floor(Math.random() * 2) == 0) {
      setsA++;
      setResults.push(setResult);
    } else {
      setsB++;
      //if playerB wins revert (*-1) the result
      setResults.push(setResult * -1);
    }

  } while (setsA < 3 && setsB < 3);

  match.sets = setResults;
  match.result = [setsA, setsB];
}


function getWinnerIdOfAGame(match) {

  //case freilos spiel - there is no player2
  if (match.freeTicket) {
    return match.player1.id;
  }

  var setsA = 0;
  var setsB = 0;

  //go through all sets and count sets won
  match.sets.forEach(e => {

    if (Math.sign(e) == 1) {
      setsA++;
    }

    if (Math.sign(e) == -1) {
      setsB++;
    }

    /*
      PROBLEM
      Ein Satz kann entweder 0 oder -0 ausgehen
      die Funktion Math.sign gibt dies auch korrekt zurück und kann dann -0 in einer Variablen speichern
      aber WIE überprüfe ich dann ob diese 0 oder -0 ist
      === -0 geht nicht - egal ob die variable 0 oder -0 ist kommt true raus
    */
    if (Math.sign(e) == 0) {
      console.log("fail");
    }

  });

  if (setsA == 3) {
    return match.player1.id;
  } else {
    return match.player2.id;
  }

}




module.exports.simulateRound = simulateRound;