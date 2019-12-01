function log(competition) {

  console.log("Players ----------------");
  competition.players.map(p => console.log(p));

  console.log("Rounds ----------------");
  competition.rounds.map(r => console.log(r));
}

function logRanking(competition) {
  console.log("Ranking After Round "+competition.rounds.length+" ----------");

  var sortedPlayers = sortBy(competition.players, "gamesWon");

  //ranking contains multiple playersWithSameAmountOfGamesWon Arrays
  var ranking = [];

  /*
    if round 1 is over there are 2 grups of players (0|1 gamesWon )
    if round 2 is over there are 3 grups of players (0|1|2 gameWon)
    ...
  */
  for (var i = 0; i < competition.rounds.length + 1; i++) {
    var playersWithSameAmountOfGamesWon = [];

    //group players that have the same gamesWon togehter in array ranking
    sortedPlayers.forEach(player => {
      if (player.gamesWon == i)
        playersWithSameAmountOfGamesWon.push(player);
    });
    //This is call by value (right?)
    ranking.push(playersWithSameAmountOfGamesWon);
  }
  
  //reverser ranking in order that 0 point players are at the bottom of the log
  ranking.reverse();
  
  ranking.forEach(playersWithSameGamesWon => {
    //if there is a group there must be a player at [0] to get the gamesWon  <--- wrong, can be empty..
    //solution 
    if(playersWithSameGamesWon.length != 0)
    console.log(groupToString(playersWithSameGamesWon));
  });
}

function groupToString(playersWithSameGamesWon) {
  var string = "";
  string += playersWithSameGamesWon[0].gamesWon + " Siege Spieler -> "
  playersWithSameGamesWon.forEach(player => {
    string += player.lastname + " ";
  });
  return string;
}


//TODO how to sort multiple parameter -> gameswon -> bhz -> ttr
function sortBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

module.exports.log = log;
module.exports.logRanking = logRanking;


