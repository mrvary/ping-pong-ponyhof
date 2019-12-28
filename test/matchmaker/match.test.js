const { createMatch, createMatches } = require("../../src/matchmaker/match");
const { cleanedUpPlayers } = require("./player.test.data");

describe("createMatches()", () => {
  test.todo("creates an array of matches from an array of pairings");
  test.todo("increments the matchId between two executions");
});

describe("createMatch", () => {
  const [inputPlayer1, inputPlayer2] = cleanedUpPlayers;
  const match = createMatch({ player1: inputPlayer1, player2: inputPlayer2 });

  test("creates match that has all the necessary properties", () => {
    expect(match.id).toBeDefined();
    expect(match.player1).toBeDefined();
    expect(match.player2).toBeDefined();
    expect(match.result).toBeDefined();
    expect(match.sets).toBeDefined();
    expect(match.freeTicket).toBeDefined();
  });

  test("creates free ticket match, when second player doesn't exist", () => {
    const freeTicketMatch = createMatch({ player1: inputPlayer1, player2: {} });
    expect(freeTicketMatch.freeTicket).toBe(true);
  });

  test("adds the matchId to player objects", () => {
    const { id, player1, player2 } = match;

    console.log(player1.matchIds);
    expect(player1.matchIds).toContain(id);
    expect(player2.matchIds).toContain(id);
  });
});
