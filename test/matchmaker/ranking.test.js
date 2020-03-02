const {
  createCurrentRanking,
  calculateBHZ,
  calculateTTRDifference,
  getMatchesInvolved,
  addMatchDetails,
  createMatchResult,
  getParameterByPlayerId,
  ttrCalculation
} = require("../../src/matchmaker/ranking");

const { playersAfterUpdateWinner } = require("./player.test.data");

const {
  matchWithResult_13,
  matchWithResult_12,
  matchWithResult_10,
  matchWithWrongSets,
  twoPlayers,
  matchesToUpdate,
  dummyMatches,
  playersForRanking,
  matchesForRanking,
  expectedRanking
} = require("./ranking.test.data");

describe("createCurrentRanking()", () => {
  test("expected ranking was created", () => {
    expect(createCurrentRanking(playersForRanking, matchesForRanking)).toEqual(
      expectedRanking
    );
  });
});

describe("calculateBHZ()", () => {
  test("correct BHZ for each player", () => {
    let resultPerPlayer = [];
    playersAfterUpdateWinner.forEach(player => {
      resultPerPlayer.push(calculateBHZ(player, playersAfterUpdateWinner));
    });
    expect(resultPerPlayer).toEqual([3, 3, 1, 1]);
  });
});

describe("calculateTTRDifference()", () => {
  test("calculation against normal opponent", () => {
    let players = twoPlayers;
    let dummyPlayer = players[0];
    dummyPlayer.opponentIds = ["PLAYER1"];
    expect(calculateTTRDifference(dummyPlayer, players)).toBe(5);
  });

  test("calculation with normal opponent + FreeTicket player", () => {
    let players = twoPlayers;
    players.push({
      id: "FreeTicket",
      gamesWon: 0,
      lastname: "FREILOS",
      matchIds: [],
      opponentIds: [],
      qttr: 0
    });
    let dummyPlayer = players[0];
    dummyPlayer.opponentIds = ["PLAYER1", "FreeTicket"];
    dummyPlayer.gamesWon = 2;
    expect(calculateTTRDifference(dummyPlayer, players)).toBe(5);
  });

  test("calculation just against FreeTicket player", () => {
    let players = twoPlayers;
    players.push({
      id: "FreeTicket",
      gamesWon: 0,
      lastname: "FREILOS",
      matchIds: [],
      opponentIds: [],
      qttr: 0
    });
    let dummyPlayer = players[0];
    dummyPlayer.opponentIds = ["FreeTicket"];
    dummyPlayer.gamesWon = 1;
    expect(calculateTTRDifference(dummyPlayer, players)).toBe(0);
  });
});

describe("ttrCalculation()", () => {
  test("calculation of ttr difference", () => {
    //these are real life examples
    expect(ttrCalculation(1617, [1478], 1)).toBe(2);
    expect(ttrCalculation(1576, [1703, 1458], 1)).toBe(0);
    expect(ttrCalculation(1624, [1631, 1712], 0)).toBe(-11);
    expect(ttrCalculation(1464, [1539, 1465, 1320, 1333, 1444], 0)).toBe(-50);
    expect(ttrCalculation(1449, [1613, 1477, 1492, 1564, 1493, 1524], 6)).toBe(
      71
    );
    expect(ttrCalculation(1637, [1449, 1572, 1428, 1484, 1603, 1563], 3)).toBe(
      -31
    );
  });
});

describe("getMatchesInvolved()", () => {
  test("get the correct matches back", () => {
    twoPlayers.forEach(player => {
      player.matches = getMatchesInvolved(player.matchIds, dummyMatches);
      expect(player.matchIds.length).toBe(player.matches.length);
    });
  });
});

describe("addMatchDetails()", () => {
  test("add first and lastname of the players to a match", () => {
    let matches = matchesToUpdate;
    addMatchDetails(twoPlayers, matches);

    expect(matches[0].player1).toBe("PingPong");
    expect(matches[0].player1firstname).toBe("Pony");
    expect(matches[0].player1lastname).toBe("Hof");

    expect(matches[0].player2).toBe("PLAYER1");
    expect(matches[0].player2firstname).toBe("Gerhard");
    expect(matches[0].player2lastname).toBe("Acker");

    expect(matches[1].player1).toBe("Player1");
    expect(matches[1].player1firstname).toBeUndefined();
    expect(matches[1].player1lastname).toBeUndefined();

    expect(matches[1].player2firstname).toBeUndefined();
    expect(matches[1].player2lastname).toBeUndefined();
  });
});

describe("getParameterByPlayerId()", () => {
  test("get the correct value from the right playerId", () => {
    expect(getParameterByPlayerId("PingPong", twoPlayers, "firstname")).toBe(
      "Pony"
    );
    expect(getParameterByPlayerId("PingPong", twoPlayers, "lastname")).toBe(
      "Hof"
    );
    expect(getParameterByPlayerId("PingPong", twoPlayers, "clubname")).toBe(
      "Einhornhausen"
    );
    expect(getParameterByPlayerId("PingPong", twoPlayers, "gamesWon")).toBe(1);
    expect(getParameterByPlayerId("PingPong", twoPlayers, "qttr")).toBe(2020);
    expect(getParameterByPlayerId("PingPong", twoPlayers, "active")).toBe(true);

    expect(getParameterByPlayerId("PLAYER1", twoPlayers, "firstname")).toBe(
      "Gerhard"
    );
    expect(getParameterByPlayerId("PLAYER1", twoPlayers, "lastname")).toBe(
      "Acker"
    );

    expect(
      getParameterByPlayerId("Ping", twoPlayers, "firstname")
    ).toBeUndefined();
    expect(
      getParameterByPlayerId("Pong", twoPlayers, "lastname")
    ).toBeUndefined();
  });
});

describe("createMatchResult()", () => {
  test("correct match result was created", () => {
    const matchResult_13 = createMatchResult(matchWithResult_13);
    const matchResult_12 = createMatchResult(matchWithResult_12);
    const matchResult_10 = createMatchResult(matchWithResult_10);
    const matchResult_00 = createMatchResult(matchWithWrongSets);

    expect(matchResult_13.player1).toBe(1);
    expect(matchResult_13.player2).toBe(3);

    expect(matchResult_12.player1).toBe(1);
    expect(matchResult_12.player2).toBe(2);

    expect(matchResult_10.player1).toBe(1);
    expect(matchResult_10.player2).toBe(0);

    expect(matchResult_00.player1).toBe(0);
    expect(matchResult_00.player2).toBe(0);
  });
});
