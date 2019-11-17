class Matchmaker {
  constructor(participants) {
    this.players = initPlayers(participants);

    // reduce the players size for ease of debugging
    for (let i = 0; i < 10; i++) {
      this.players.pop();
    }
    this.rounds = [];
    this.matchId = 1;
  }

  // first round uses sort by TTR
  drawFirstRound() {
    let sortedPlayers = sortBy(this.players, ["ttr"]);
    let matches = [];
    let updatedPlayers = [];

    while (sortedPlayers.length > 0) {
      const highest = sortedPlayers.shift();
      const lowest = sortedPlayers.pop();

      updatedPlayers.push({
        ...highest,
        matchesIds: highest.matchesIds.concat(this.matchId)
      });
      if (lowest) {
        updatedPlayers.push({
          ...lowest,
          matchesIds: lowest.matchesIds.concat(this.matchId)
        });
      }

      let match = {
        id: this.matchId,
        player1: highest,
        player2: lowest,
        round: 1,
        sets: [],
        freeTicket: false
      };

      this.matchId++;

      // if only one player is left, give him the free ticket
      if (!match.player2) {
        match.freeTicket = true;
      }

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

  drawRound() {}
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
      ttr
    };
  });
}

function sortBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

module.exports = Matchmaker;
