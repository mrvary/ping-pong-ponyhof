/**
 * @author Felix Breitenbach
 */

/**
 * Calculates hwo many sets a player has one against his opponent
 * @param {Match} match
 * @param {String} player
 * @param {String} opponent
 */
function setsWon(match, player, opponent) {
  let result = 0;

  result = match.sets.filter(
    set =>
      (set[player] === 11 && set[opponent] <= 9) ||
      (set[player] > 11 && set[opponent] === set[player] - 2)
  ).length;

  return result;
}

/**
 * Returns how many sets Player1 won
 * @param {Match} match
 */
function setsWonPlayer1(match) {
  return setsWon(match, "player1", "player2");
}

/**
 * Returns how many sets Player2 won
 * @param {Match} match
 */
function setsWonPlayer2(match) {
  return setsWon(match, "player2", "player1");
}

/**
 * Determine if a match is finished.
 * @param {Match} match
 * @returns {boolean}
 */
function isMatchFinished(match) {
  return setsWonPlayer1(match) === 3 || setsWonPlayer2(match) === 3;
}

module.exports = {
  setsWonPlayer1,
  setsWonPlayer2,
  isMatchFinished
};
