/**
 * @author Daniel Niemczyk
 */

const { drawFirstRound, drawRound } = require("../../src/matchmaker/drawing");

const {
  tournamentJSON,
  tournamentJSON15Players
} = require("./player.test.data");

const { createPlayersFromJSON } = require("../../src/matchmaker/player");

const initPlayers = createPlayersFromJSON(tournamentJSON15Players);

describe("drawFirstRound()", () => {
  const pairings = drawFirstRound(initPlayers);

  test("pairing defined", () => {
    expect(pairings).toBeDefined();
    expect(pairings.length).toBe(initPlayers.length / 2);
  });
});

describe("drawRound()", () => {
  const matches = drawRound(initPlayers);

  test("matches defined", () => {
    expect(matches).toBeDefined();
    expect(matches.length).toBe(initPlayers.length / 2);
  });
});
