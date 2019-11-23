class Matchmaker {
  constructor(participants) {
    this.players = initPlayers(participants);

    // reduce the players size for ease of debugging
    const AMOUNT_OF_TOURNAMENT_PARTICIPANTS = 9;
    for (let i = 0; i < 16 - AMOUNT_OF_TOURNAMENT_PARTICIPANTS; i++) {
      this.players
        .pop();
    }
    this.rounds = [];
    this.matchId = 1;
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

  // log players and rounds
  log() {
    console.log("Players ----------------");
    this.players.map(p => console.log(p));

    console.log("Rounds ----------------");
    this.rounds.map(r => console.log(r));
  }

  drawRound() { }
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

module.exports = Matchmaker;
