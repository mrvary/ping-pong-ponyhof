const {
  drawFirstRound,
  drawRound
} = require("../../src/matchmaker/drawing");

const {
  tournamentJSON
} = require("./player.test.data");

const {
  createPlayersFromJSON
} = require("../../src/matchmaker/player");

const initPlayers = createPlayersFromJSON(tournamentJSON);

describe("drawFirstRound()", () => {
  const pairings = drawFirstRound(initPlayers);

  test("pairing defined", () => {
    expect(pairings).toBeDefined();
    expect(pairings.length).toBe(initPlayers.length / 2);

  });
});


describe("drawRound()", () => {
  const tournamentObj = {
    players: initPlayers
  }
  const matches = drawRound(tournamentObj);

  test("matches defined", () => {
    expect(matches).toBeDefined();
    expect(matches.length).toBe(initPlayers.length / 2);

  });
});
