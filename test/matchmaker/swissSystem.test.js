const { drawFirstRound, drawRound } = require("../../src/matchmaker/drawing");

const {
  tournamentJSON,
  tournamentJSON15Players
} = require("./player.test.data");

const {
  createPlayersFromJSON,
  updatePlayers
} = require("../../src/matchmaker/player");

let players = createPlayersFromJSON(tournamentJSON15Players);

describe("playCompetition", () => {
  const roundsToPlay = 6;

  for (let round = 1; round <= roundsToPlay; round++) {
    let matches = drawRound(players);
    players = updatePlayers(players, matches);

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
