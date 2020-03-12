const {
  createMatch,
  createMatches,
  getMatchWinner,
  simulateMatch,
  countPlayersPoints,
  createXMLMatch
} = require("../../src/matchmaker/match");

const {
  testPairing,
  testPairingWithFreeTicket,
  pairingWithPlayer1BeingFreeTicket,
  pairingWithPlayer2BeingFreeTicket,
  match_init,
  match_noWinner,
  match_noWinner2,
  match_player1Wins,
  match_player1Wins2,
  match_player2Wins,
  match_player2Wins2,
  matchResultPlayer1Won,
  matchResultPlayer2Won
} = require("./match.test.data");

describe("createMatches()", () => {
  const matches = createMatches(testPairingWithFreeTicket, 10);
  let matchIds = new Set();
  let players = new Set();

  //add each to attribute to see if all unique
  matches.forEach(match => {
    matchIds.add(match.id);
    players.add(match.player1);
    players.add(match.player2);
  });

  test("matches created", () => {
    expect(matches.length).toBe(testPairingWithFreeTicket.length);
    expect(matchIds.size).toBe(matches.length);
    expect(players.size).toBe(matches.length * 2);
  });

  test("matchID for next match is +1", () => {
    matchIds = Array.from(matchIds);
    matchIds.reduce((prev, current) => {
      expect(current).toBe(prev + 1);
      return current;
    });
  });

  test("freeTicket player has a game", () => {
    expect(players).toContain("FreeTicket");
  });
});

describe("createMatch()", () => {
  test("creates match that has all the necessary properties", () => {
    const match = createMatch(testPairing[1], 20);

    expect(match.id).toBe(20);
    expect(match.player1).toBe("PLAYER6");
    expect(match.player2).toBe("PLAYER5");
    expect(match.sets).toEqual([
      {
        player1: 0,
        player2: 0
      },
      {
        player1: 0,
        player2: 0
      },
      {
        player1: 0,
        player2: 0
      },
      {
        player1: 0,
        player2: 0
      },
      {
        player1: 0,
        player2: 0
      }
    ]);
  });

  test("first player in the pairing is FreeTicket and looses automatically", () => {
    const match = createMatch(pairingWithPlayer1BeingFreeTicket, 33);
    expect(match.id).toBe(33);
    expect(match.player1).toBe("FreeTicket");
    expect(match.player2).toBe("PLAYER66");
    expect(match.sets).toEqual([
      {
        player1: 0,
        player2: 11
      },
      {
        player1: 0,
        player2: 11
      },
      {
        player1: 0,
        player2: 11
      },
      {
        player1: 0,
        player2: 0
      },
      {
        player1: 0,
        player2: 0
      }
    ]);
  });

  test("second player in the pairing is FreeTicket and looses automatically", () => {
    const match = createMatch(pairingWithPlayer2BeingFreeTicket, 44);
    expect(match.id).toBe(44);
    expect(match.player1).toBe("PLAYER13");
    expect(match.player2).toBe("FreeTicket");
    expect(match.sets).toEqual([
      {
        player1: 11,
        player2: 0
      },
      {
        player1: 11,
        player2: 0
      },
      {
        player1: 11,
        player2: 0
      },
      {
        player1: 0,
        player2: 0
      },
      {
        player1: 0,
        player2: 0
      }
    ]);
  });
});

describe("getMatchWinner()", () => {
  test("get expected winner of a match", () => {
    expect(getMatchWinner(match_init)).toBe(false);
    expect(getMatchWinner(match_noWinner)).toBe(false);
    expect(getMatchWinner(match_noWinner2)).toBe(false);
    expect(getMatchWinner(match_player1Wins)).toBe("PLAYER1");
    expect(getMatchWinner(match_player1Wins2)).toBe("PLAYER1");
    expect(getMatchWinner(match_player2Wins)).toBe("PLAYER2");
    expect(getMatchWinner(match_player2Wins2)).toBe("PLAYER2");
  });
});

describe("countPlayersPoints()", () => {
  test("correct calculated points made", () => {
    expect(countPlayersPoints(match_init, "PLAYER1")).toBe(0);
    expect(countPlayersPoints(match_noWinner, "PLAYER1")).toBe(22);
    expect(countPlayersPoints(match_player1Wins, "PLAYER1")).toBe(38);
    expect(countPlayersPoints(match_player1Wins, "PLAYER2")).toBe(20);
    expect(countPlayersPoints(match_player1Wins2, "PLAYER1")).toBe(63);
  });
});

describe("simulateMatch()", () => {
  test("get expected match result", () => {
    const matchWithResult = simulateMatch(match_init);
    //easiest way to test if two arrays are equal to each other --> compare their strings
    expect(
      JSON.stringify(matchWithResult.sets) ==
        JSON.stringify(matchResultPlayer1Won) ||
        JSON.stringify(matchWithResult.sets) ==
          JSON.stringify(matchResultPlayer2Won)
    ).toBe(true);
    expect(getMatchWinner(matchWithResult)).not.toBe(false);
  });
});

describe("createXMLMatch()", () => {
  test("correct JSON obj for XML was created", () => {
    const xmlJSON = createXMLMatch(match_player2Wins2, 4);
    expect(xmlJSON).toEqual({
      group: "Schweizer System (Runde 4)",
      nr: 1,
      "player-a": "PLAYER1",
      "player-b": "PLAYER2",
      "matches-a": 0,
      "matches-b": 1,
      "sets-a": 1,
      "sets-b": 3,
      "sets-a-1": 8,
      "sets-b-1": 11,
      "sets-a-2": 11,
      "sets-b-2": 13,
      "sets-a-3": 11,
      "sets-b-3": 0,
      "sets-a-4": 4,
      "sets-b-4": 11,
      "sets-a-5": 0,
      "sets-b-5": 0,
      "sets-a-6": 0,
      "sets-b-6": 0,
      "sets-a-7": 0,
      "sets-b-7": 0,
      "games-a": 34,
      "games-b": 35
    });
  });
});
