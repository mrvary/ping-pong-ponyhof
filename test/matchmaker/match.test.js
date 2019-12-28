const { createMatch, createMatches } = require("../../src/matchmaker/match");
const { cleanedUpPlayers } = require("./player.test.data");

describe("createMatches()", () => {
  test.todo("creates an array of matches from an array of pairings");
});

describe("createMatch", () => {
  const [player1, player2] = cleanedUpPlayers;
  const match = createMatch({ player1, player2 });

  test.only("creates match that has all the necessary properties", () => {
    expect(match.id).toBeDefined();
    expect(match.player1).toBeDefined();
    expect(match.player2).toBeDefined();
    expect(match.result).toBeDefined();
    expect(match.sets).toBeDefined();
    expect(match.freeTicket).toBeDefined();
  });
  test("increments the matchId between two executions", () => {});
  test.todo("adds a matchId to player objects");
});
