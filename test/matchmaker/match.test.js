const { createMatch, createMatches } = require("../../src/matchmaker/match");
const { testPairing, testPairingWithFreeTicket } = require("./match.test.data");

describe("createMatches()", () => {
  const matches = createMatches(testPairingWithFreeTicket);
  let matchIds = new Set();
  let players = new Set();

  matches.forEach(match => {
    matchIds.add(match.id);
    players.add(match.player1);
    players.add(match.player2);
  });

  const matchCount = matches.length;

  test("creates an array of matches from an array of pairings", () => {
    expect(matchCount).toBe(testPairingWithFreeTicket.length);
    expect(matchIds.size).toBe(matchCount);
    expect(players.size).toBe(matchCount * 2);
  });

  test("matchID for next match is ++1", () => {
    matchIds = Array.from(matchIds);
    matchIds.reduce((prev, current) => {
      expect(current).toBe(prev + 1);
      return current;
    });
  });

  test("freeTicket player exists", () => {
    expect(players).toContain("FreeTicket");
  });
});

describe("createMatch()", () => {
  const match = createMatch(testPairing[1]);

  test("creates match that has all the necessary properties", () => {
    expect(match.id).toBeDefined();
    expect(match.player1).toBeDefined();
    expect(match.player2).toBeDefined();
    expect(match.sets).toBeDefined();
  });
});
