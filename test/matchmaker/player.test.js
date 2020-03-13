/**
 * @author Daniel Niemczyk
 * @author Felix Breitenbach
 */

const {
  createPlayer,
  sortPlayersBy,
  createPlayersFromJSON,
  updatePlayersAfterDrawing,
  isFreeticketPlayerInMatch,
  updateWinner
} = require("../../src/matchmaker/player");

const {
  inputPlayers,
  cleanedUpPlayers,
  tournamentJSON15Players,
  tournamentJSON16Players,
  EXPECTED_PLAYER,
  match_noFreeticket,
  match_noFreeticket2,
  match_withFreeticket,
  match_withFreeticket2,
  playersBeforeUpdateDrawing,
  matchesToPlay,
  playersBeforeUpdateWinner,
  matchesToUseForUpdatingWinner,
  playersAfterUpdateWinner
} = require("./player.test.data");

describe("createPlayersFromJSON()", () => {
  test("players where cerated", () => {
    const players = createPlayersFromJSON(tournamentJSON16Players);
    const playersWithFreeticket = createPlayersFromJSON(
      tournamentJSON15Players
    );

    expect(players.length).toBe(16);
    expect(playersWithFreeticket.length).toBe(16);
  });
});

describe("createPlayer()", () => {
  test("returns the correct object", () => {
    const createdPlayer = createPlayer(inputPlayers[0]);

    expect(createdPlayer).toEqual(EXPECTED_PLAYER);
  });
  const players = createPlayersFromJSON(tournamentJSON16Players);
  test("returns a list of players", () => {
    expect(players).toHaveLength(16);
  });

  test("with correct player objects", () => {
    expect(players[0]).toEqual(EXPECTED_PLAYER);
  });

  //tests for odd number of humanplayers now
  const playersWithFreeTicketPlayer = createPlayersFromJSON(
    tournamentJSON15Players
  );
  test("freeticketPlayer created", () => {
    expect(playersWithFreeTicketPlayer).toContainEqual({
      id: "FreeTicket",
      gamesWon: 0,
      lastname: "FREILOS",
      matchIds: [],
      opponentIds: [],
      qttr: 0
    });

    expect(playersWithFreeTicketPlayer).toHaveLength(16);
  });
});

describe("sortPlayersBy()", () => {
  test("sorts players by qttr (ascending)", () => {
    const [p1, p2, p3] = sortPlayersBy(cleanedUpPlayers, "qttr");
    expect(p1.qttr).toBeGreaterThanOrEqual(p2.qttr);
    expect(p2.qttr).toBeGreaterThanOrEqual(p3.qttr);
  });

  test("sorts players by games won (ascending)", () => {
    const [p1, p2, p3] = sortPlayersBy(cleanedUpPlayers, "gamesWon");
    expect(p1.gamesWon).toBeGreaterThanOrEqual(p2.gamesWon);
    expect(p2.gamesWon).toBeGreaterThanOrEqual(p3.gamesWon);
  });
});

describe("updatePlayersAfterDrawing()", () => {
  const updatedPlayers = updatePlayersAfterDrawing(
    playersBeforeUpdateDrawing,
    matchesToPlay
  );
  test("update players with matches drawn", () => {
    expect(updatedPlayers).toEqual(playersBeforeUpdateWinner);
  });
});

describe("isFreeticketPlayerInMatch()", () => {
  test("no FreeTicket player in match", () => {
    expect(isFreeticketPlayerInMatch(match_noFreeticket)).toBe(false);
    expect(isFreeticketPlayerInMatch(match_noFreeticket2)).toBe(false);
  });

  test("recognice FreeTicket player in match", () => {
    expect(isFreeticketPlayerInMatch(match_withFreeticket)).toBe(true);
    expect(isFreeticketPlayerInMatch(match_withFreeticket2)).toBe(true);
  });
});

describe("updateWinner()", () => {
  test("correct output from updateWinner", () => {
    expect(
      updateWinner(playersBeforeUpdateWinner, matchesToUseForUpdatingWinner)
    ).toEqual(playersAfterUpdateWinner);
  });
});
