const Logger = require("./logger.js");
const Drawer = require("./drawer.js");
const Simulator = require("./matchSimulator.js");
const Ranker = require("./ranker.js");

class Competition {
  constructor(participants) {
    this.players = initPlayers(participants);
    this.logger = Logger;
    this.drawer = Drawer;
    this.ranker = Ranker;
    this.simulator = Simulator;
    this.rounds = [];
    this.ranking = [];
    this.matchId = 1;
  }

  //these functions are not even necessary - it can be called directly -> Java Style
  drawNextRound() {
    this.drawer.drawNextRound(this);
  }

  simulateRound() {
    this.simulator.simulateRound(this);
  }

  generateRanking() {
    this.ranker.generateRanking(this);
  }

  log() {
    this.logger.log(this);
  }

  logLatestRound() {
    this.logger.logLatestRound(this);
  }

  logRanking() {
    this.logger.logRanking(this);
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
      qttr: ttr,
      active: true,
      freeTicketGame: false
    };
  });
}


module.exports = Competition;
