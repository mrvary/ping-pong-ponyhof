function setsWon(match, player, opponent) {
  let result = 0;

  result = match.sets.filter(
    set => set[player] >= 11 && set[player] - 2 >= set[opponent]
  ).length;

  return result;
}

module.exports = {
  setsWon
};
