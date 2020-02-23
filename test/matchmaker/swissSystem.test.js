const { drawRound } = require("../../src/matchmaker/drawing");

const {
  tournamentJSON,
  tournamentJSON15Players
} = require("./player.test.data");

const { simulateMatches } = require("../../src/matchmaker/match");

const {
  createPlayersFromJSON,
  updatePlayersAfterDrawing,
  updateWinner
} = require("../../src/matchmaker/player");

let players = createPlayersFromJSON(tournamentJSON15Players);

describe("playCompetition", () => {
  const roundsToPlay = 6;

  for (let round = 1; round <= roundsToPlay; round++) {
    //1. create new matches for the round (drawing)
    let matches = drawRound(players);

    //2. update the players with the created matches
    players = updatePlayersAfterDrawing(players, matches);

    //3. simulate matches
    matches = simulateMatches(matches);

    //4.update winner
    players = updateWinner(players, matches);

    test("match length", () => {
      expect(matches.length).toEqual(players.length / 2);
    });
    test("gamesWon", () => {
      let sumGamesWon = 0;
      players.forEach(player => {
        sumGamesWon += player.gamesWon;
      });
      expect(sumGamesWon).toEqual((round * players.length) / 2);
    });
  }
});
