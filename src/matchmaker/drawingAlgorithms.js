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

//Algorithms for drawing later round
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
    let playersWithSameAmountOfGamesWon = [];

    players.forEach(player => {
      if (player.gamesWon === i) playersWithSameAmountOfGamesWon.push(player);
    });
    groups.push(playersWithSameAmountOfGamesWon);
  }
  //reverser ranking so that the best players are at the beginning of the array
  groups.reverse();

  return groups;
}

//Help functions

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
  groupsToString
};
