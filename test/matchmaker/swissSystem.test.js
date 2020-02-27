const { drawRound } = require("../../src/matchmaker/drawing");

const {
  tournamentJSON,
  tournamentJSON15Players
} = require("./player.test.data");

const { simulateMatches, logMatches } = require("../../src/matchmaker/match");

const {
  createCurrentRanking,
  logRanking
} = require("../../src/matchmaker/ranking");

const {
  createPlayersFromJSON,
  updatePlayersAfterDrawing,
  updateWinner
} = require("../../src/matchmaker/player");

let players = createPlayersFromJSON(tournamentJSON15Players);

describe("playCompetition", () => {
  const roundsToPlay = 6;
  let matches = [];

  for (let round = 1; round <= roundsToPlay; round++) {
    //1. create new matches for the round (drawing)
    let currentMatches = drawRound(players);

    //2. update the players with the created matches
    players = updatePlayersAfterDrawing(players, currentMatches);

    //3.1 simulate matches
    currentMatches = simulateMatches(currentMatches);

    //3.2 add currentMatches to all matches
    currentMatches.forEach(currentMatch => {
      matches.push(currentMatch);
    });

    //3.3 log matches
    // logMatches(currentMatches, players);

    //4. update winner
    players = updateWinner(players, currentMatches);

    //5. create ranking
    let ranking = createCurrentRanking(players, matches);

    //5.5 log ranking
    // logRanking(ranking);

    test("current matches length", () => {
      expect(currentMatches.length).toEqual(players.length / 2);
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
