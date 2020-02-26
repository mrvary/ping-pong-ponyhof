const {
  createCurrentRanking,
  calculateBHZ,
  calculateNewTTR,
  getMatchesInvolved,
  addMatchDetails,
  createMatchResult,
  getParameterByPlayerId
} = require("../../src/matchmaker/ranking");

const { playersAfterUpdateWinner } = require("./player.test.data");

const {
  matchWithResult_13,
  matchWithResult_12,
  matchWithResult_10,
  matchWithWrongSets,
  twoPlayers,
  matchesToUpdate
} = require("./ranking.test.data");

describe("createCurrentRanking()", () => {});

describe("calculateBHZ()", () => {
  test("correct BHZ for each player", () => {
    let resultPerPlayer = [];
    playersAfterUpdateWinner.forEach(player => {
      resultPerPlayer.push(calculateBHZ(player, playersAfterUpdateWinner));
    });
    expect(resultPerPlayer).toEqual([3, 3, 1, 1]);
  });
});

describe("calculateNewTTR()", () => {});
describe("getMatchesInvolved()", () => {});

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
    expect(getParameterByPlayerId("PingPong", twoPlayers, "gamesWon")).toBe(
      9000
    );
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
