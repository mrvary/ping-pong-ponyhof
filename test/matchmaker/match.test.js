const { createMatch, createMatches } = require("../../src/matchmaker/match");
const { cleanedUpPlayers } = require("./player.test.data");
const {
  separateTopFromBottomPlayers,
  pairPlayers
} = require("../../src/matchmaker/player");

describe("createMatches()", () => {
  const players = cleanedUpPlayers
    .map(player => ({
      ...player,
      firstname: player.firstname + " Copy",
      id: player.id + "0",
      qttr: player.qttr + 100
    }))
    .concat(cleanedUpPlayers);

  const separatedPlayers = separateTopFromBottomPlayers(players);
  const pairings = pairPlayers(separatedPlayers);
  const matches = createMatches(pairings);

  test("creates an array of matches from an array of pairings", () => {
    let matchIds = new Set();
    let players = new Set();

    matches.forEach(match => {
      matchIds.add(match.id);
      players.add(match.player1.id);
      players.add(match.player2.id);
    });

    const matchCount = matches.length;

    expect(matchCount).toBe(pairings.length);
    expect(matchIds.size).toBe(matchCount);
    expect(players.size).toBe(matchCount * 2);

    matchIds = Array.from(matchIds);
    for (let index = 0; index < matchIds.length - 1; index++) {
      expect(matchIds[index]).toBe(matchIds[index + 1] - 1);
    }

    matchIds.reduce((prev, current) => {
      expect(current).toBe(prev + 1);
      return current;
    });
  });
});

describe("createMatch", () => {
  const [inputPlayer1, inputPlayer2] = cleanedUpPlayers;
  const match = createMatch({ player1: inputPlayer1, player2: inputPlayer2 });

  test("creates match that has all the necessary properties", () => {
    expect(match.id).toBeDefined();
    expect(match.player1).toBeDefined();
    expect(match.player2).toBeDefined();
    expect(match.sets).toBeDefined();
    expect(match.freeTicket).toBeDefined();
  });

  test("freeTicket property is false on regular matches", () => {
    expect(match.freeTicket).toBe(false);
  });

  test("creates free ticket match, when second player doesn't exist", () => {
    const freeTicketMatch = createMatch({ player1: inputPlayer1, player2: {} });
    expect(freeTicketMatch.freeTicket).toBe(true);
  });

  test("adds the matchId to player objects", () => {
    const { id, player1, player2 } = match;
    expect(player1.matchIds).toContain(id);
    expect(player2.matchIds).toContain(id);
  });
});
