const Logger = require("./logger.js");

class Matchmaker {
  constructor(participants) {
    this.players = initPlayers(participants);
    this.logger = Logger;
    // reduce the players size for ease of debugging
    const AMOUNT_OF_TOURNAMENT_PARTICIPANTS = 9;
    for (let i = 0; i < 16 - AMOUNT_OF_TOURNAMENT_PARTICIPANTS; i++) {
      this.players
        .pop();
    }
    this.rounds = [];
    this.matchId = 1;
  }

  drawRound(){

    
  }

  drawFirstRound() {
    let sortedPlayers = sortBy(this.players, ["ttr"]);
    let matches = [];
    let updatedPlayers = [];

    /*
        Auslosung für Runde 1 ist anders
        teile alle TN in obere Hälfte(topPlayers) und untere Hälfte(bottomPlayers)
        wenn TN-Anzahl ungerade dann soll der mittlere Spieler in die stärkere Hälfte

        hole einen zufälligen Spieler aus der oberen und unteren Hälfte und matche diese zusammen
        lösche die beiden Spieler aus dem pool der verfügbaren Spieler
        bei ungerader TN-Anzahl hat so ein zufälliger topPlayer ein freilos
    */

    let topPlayers = sortedPlayers.slice(0, Math.ceil(sortedPlayers.length / 2));
    let bottomPlayers = sortedPlayers.slice(Math.ceil(sortedPlayers.length / 2), sortedPlayers.length);


    while (bottomPlayers.length != 0) {
      const choosenBetterPlayer = topPlayers[Math.floor(Math.random() * topPlayers.length)];
      const choosenWorsePlayer = bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

      //remove choosenPlayer out of topPlayers
      topPlayers = topPlayers.filter(player => player !== choosenBetterPlayer);
      bottomPlayers = bottomPlayers.filter(player => player !== choosenWorsePlayer);

      updatedPlayers.push({
        ...choosenBetterPlayer,
        matchesIds: choosenBetterPlayer.matchesIds.concat(this.matchId)
      });

      updatedPlayers.push({
        ...choosenWorsePlayer,
        matchesIds: choosenWorsePlayer.matchesIds.concat(this.matchId)
      });

      let match = {
        id: this.matchId,
        player1: choosenBetterPlayer,
        player2: choosenWorsePlayer,
        round: 1,
        sets: [],
        freeTicket: false
      };
      matches.push(match);

      this.matchId++;

    }//end while

    //check for ungeradeTN -- create freilos Spiel
    if (topPlayers.length == 1) {

      updatedPlayers.push({
        ...topPlayers[0],
        matchesIds: topPlayers[0].matchesIds.concat(this.matchId)
      });

      let match = {
        id: this.matchId,
        player1: topPlayers[0],
        player2: null,
        round: 1,
        sets: [],
        freeTicket: true
      };
      matches.push(match);
    }

    this.players = updatedPlayers;
    this.rounds.push(matches);
  }

  simulateRound() {
    const BETTER_PLAYER_SHOULD_WIN = false;

    //drawing for Round X already made 
    let roundNr = this.rounds.length;
    let currentRound = this.rounds[roundNr - 1];

    //create for every match in the round a random result and update the match result (sets)
    currentRound.forEach(e => {
      let res = createRandomMatchResult();
      e.sets = res;

      //get the winner out of a match and update his gamesWon
      //can be put into a seperate func as well
      let winnerId = getWinnerIdOfAGame(e);
      this.players.forEach(player => {
        if (player.id == winnerId) {
          player.gamesWon++;
        }
      });

    });

  }

  log() {
    this.logger.log(this);
  }

  drawNextRound() {
    debugger;

  }
}

function initPlayers(players) {
  return players.map(player => {
    // destructure input
    const { id, person } = player;
    const { firstname, lastname, ttr } = person;
    const clubname = person["club-name"];

    return {
      id,
      firstname,
      lastname,
      clubname,
      gamesWon: 0,
      matchesIds: [],
      ttr,
      active: true
    };
  });
}

function sortBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}


function createRandomMatchResult() {

  var res = [];

  var setsA = 0;
  var setsB = 0;

  //TODO - remove the +1 - need to be fixed in getWinnerId func first
  do {
    //create Random result from 0-15
    var setResult = Math.floor(Math.random() * 16) + 1;

    //decide on random wich player wins
    if (Math.floor(Math.random() * 2) == 0) {
      setsA++;
      res.push(setResult);
    } else {
      setsB++;
      //if playerB wins revert (*-1) the result
      res.push(setResult * -1);
    }

  } while (setsA < 3 && setsB < 3);

  return res;

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

module.exports = Matchmaker;
