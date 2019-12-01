const Logger = require("./logger.js");
const Drawer = require("./drawer.js");
const Simulator = require("./matchSimulator.js");


class Competition {
  constructor(participants) {
    this.players = initPlayers(participants);
    this.logger = Logger;
    this.drawer = Drawer;
    this.simulator = Simulator;
    this.rounds = [];
    this.matchId = 1;
  }

  //these functions are not even necessary - it can be called directly
  drawNextRound(){
    this.drawer.drawNextRound(this);
  }
  
  simulateRound() {
    this.simulator.simulateRound(this);
  }

  log() {
    this.logger.log(this);
  }

  logLatestRound(){
    this.logger.logLatestRound(this);
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


module.exports = Competition;
