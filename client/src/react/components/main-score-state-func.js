function setsWon(match, player, opponent) {
  let result = 0;

  result = match.sets.filter(
    set => set[player] >= 11 && set[player] - 2 >= set[opponent]
  ).length;

  return result;
}

function setsWonPlayer1(match) {
  return setsWon(match, 'player1', 'player2');
}

function setsWonPlayer2(match) {
  return setsWon(match, 'player2', 'player1');
}

module.exports = {
  setsWonPlayer1,
  setsWonPlayer2
};
