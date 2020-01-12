const {
  createPlayer,
  sortPlayersBy,
  createPlayersFromJSON,
  updatePlayers
} = require("../../src/matchmaker/player");

const {
  inputPlayers,
  cleanedUpPlayers,
  tournamentJSON,
  tournamentJSON15Players
} = require("./player.test.data");

const { testMatches } = require("./match.test.data");

const EXPECTED_PLAYER = {
  id: "PLAYER1",
  firstname: "Gerhard",
  lastname: "Acker",
  clubname: "ESV SF Neuaubing",
  gamesWon: 0,
  matchIds: [],
  opponentIds: [],
  qttr: 1415,
  active: true,
  hadFreeTicketAlready: false
};

describe("createPlayer()", () => {
  test("returns the correct object", () => {
    const createdPlayer = createPlayer(inputPlayers[0]);

    expect(createdPlayer).toEqual(EXPECTED_PLAYER);
  });
});

describe("createPlayers()", () => {
  const players = createPlayersFromJSON(tournamentJSON);
  test("returns a list of players", () => {
    expect(players).toHaveLength(16);
  });

  test("with correct player objects", () => {
    expect(players[0]).toEqual(EXPECTED_PLAYER);
  });

  //tests for odd number of humanplayers now
  const playersWithFreeTicketPlayer = createPlayersFromJSON(tournamentJSON15Players);
  test("freeticketPlayer created", () => {

    expect(playersWithFreeTicketPlayer).toContainEqual({
      id: "FreeTicket",
      gamesWon: 0,
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


describe("updatePlayers()", () => {

  test.todo("returns an array of all players from an array of matches");

  test.todo("check gamesWon changed for winners");

  test.todo("match Id added to each player");

  test.todo("opponent Id added to each player");
});
