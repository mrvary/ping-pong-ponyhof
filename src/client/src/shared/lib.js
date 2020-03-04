// return how many sets a player won against an opponent
function setsWon(match, player, opponent) {
  let result = 0;

  result = match.sets.filter(
    set =>
      (set[player] === 11 && set[opponent] <= 9) ||
      (set[player] > 11 && set[opponent] === set[player] - 2)
  ).length;

  return result;
}

function setsWonPlayer1(match) {
  return setsWon(match, "player1", "player2");
}

function setsWonPlayer2(match) {
  return setsWon(match, "player2", "player1");
}

function isMatchFinished(match) {
  return setsWonPlayer1(match) === 3 || setsWonPlayer2(match) === 3;
}

module.exports = {
  setsWonPlayer1,
  setsWonPlayer2,
  isMatchFinished
};
