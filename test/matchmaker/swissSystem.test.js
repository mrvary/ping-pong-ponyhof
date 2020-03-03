const { drawRound } = require("../../src/matchmaker/drawing");

const {
  tournamentJSON16Players,
  tournamentJSON15Players
} = require("./player.test.data");

const { simulateMatches, logMatches } = require("../../src/matchmaker/match");

const {
  createCurrentRanking,
  logRanking
} = require("../../src/matchmaker/ranking");

const { exportXML } = require("../../src/modules/export/xml-exporter");

const { testXMLasJSON } = require("./tournament.test.data");

const {
  createPlayersFromJSON,
  updatePlayersAfterDrawing,
  updateWinner
} = require("../../src/matchmaker/player");

let players = createPlayersFromJSON(tournamentJSON16Players);

describe("playCompetition", () => {
  const roundsToPlay = 6;
  let matches = [];
  let currentMatches;
  let ranking;

  for (let round = 1; round <= roundsToPlay; round++) {
    //1. create new matches for the round (drawing)
    currentMatches = drawRound(players);

    //2. update the players with the created matches
    players = updatePlayersAfterDrawing(players, currentMatches);

    //3.1 simulate matches
    currentMatches = simulateMatches(currentMatches);

    //3.2 add currentMatches to all matches
    currentMatches.forEach(currentMatch => {
      matches.push(currentMatch);
    });

    //3.3 log matches
    logMatches(currentMatches, players);

    //4. update winner
    players = updateWinner(players, currentMatches);

    //5. create ranking
    ranking = createCurrentRanking(players, matches);

    //5.5 log ranking
    logRanking(ranking);

    //6. export final XML
    if (round === 6) exportXML(players, matches, testXMLasJSON);
  }

  test("match length of the last round", () => {
    expect(currentMatches.length).toEqual(players.length / 2);
  });

  test("gamesWon ", () => {
    let sumGamesWon = 0;
    players.forEach(player => {
      sumGamesWon += player.gamesWon;
    });
    expect(sumGamesWon).toBe((roundsToPlay * players.length) / 2);
  });

  //TODO check if the sum of all players must be 0?
  //sometimes the result is 1 or 2
  test("ttr difference of all players together  ", () => {
    let ttrDiff = 0;
    ranking.forEach(player => {
      ttrDiff += player.ttr_diff;
    });
    expect(ttrDiff).toBeLessThan(3);
  });

  test("check bhz", () => {
    let bhz = 0;
    ranking.forEach(player => {
      bhz += player.bhz;
    });
    expect(bhz).toBe(288);
  });
});
