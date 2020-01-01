const {
  createPlayer,
  pairPlayers,
  shuffle,
  sortPlayersBy,
  separateTopFromBottomPlayers,
  createPlayersFromJSON,
  updatePlayers
} = require("../../src/matchmaker/player");

const {
  inputPlayers,
  cleanedUpPlayers,
  tournamentJSON
} = require("./player.test.data");

const {
  testMatches
} = require("./match.test.data");

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
  hasFreeTicket: false
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

describe("separateTopFromBottomPlayers()", () => {
  const evenNumberOfPlayers = cleanedUpPlayers
    .map(player => ({ ...player, qttr: player.qttr + 100 }))
    .concat(cleanedUpPlayers);

  test("splits an even list in half", () => {
    const { top, bottom } = separateTopFromBottomPlayers(evenNumberOfPlayers);
    expect(top.length).toBe(bottom.length);
  });

  test("keeps the sorting by qttr", () => {
    const { top, bottom } = separateTopFromBottomPlayers(evenNumberOfPlayers);

    top.forEach(topPlayer => {
      for (let bottomPlayer of bottom) {
        expect(topPlayer.qttr).toBeGreaterThanOrEqual(bottomPlayer.qttr);
      }
    });
  });

  test("splits an odd list in a bigger and smaller half", () => {
    const oddNumberOfPlayers = cleanedUpPlayers;
    const { top, bottom } = separateTopFromBottomPlayers(oddNumberOfPlayers);
    expect(top.length).toBe(bottom.length + 1);
  });
});

describe("shuffle()", () => {
  // can fail, maybe test differently?
  const a = shuffle([1, 2, 3, 4, 5, 6]);
  const b = shuffle([1, 2, 3, 4, 5, 6]);
  const c = shuffle([1, 2, 3, 4, 5, 6]);
  test("shuffles an input array", () => {
    expect(a).not.toEqual(b);
    expect(b).not.toEqual(c);
    expect(a).not.toEqual(c);
  });

  test("still contains all elements", () => {
    expect(a.length).toBe(6);
    expect(a).toEqual(expect.arrayContaining([1, 2, 3, 4]));
  });
});

describe("pairPlayers()", () => {
  //tests for even number of players
  const evenNumberOfPlayers = cleanedUpPlayers
    .map(player => ({
      ...player, firstname: player.firstname + " Copy",
      id: player.id + "0",
      qttr: player.qttr + 100
    }))
    .concat(cleanedUpPlayers);

  const evenTopAndBottomPlayers = separateTopFromBottomPlayers(
    evenNumberOfPlayers
  );
  const evenPairedPlayers = pairPlayers(evenTopAndBottomPlayers);

  test("returns no unmatched player when even", () => {
    const { unmatchedPlayer } = evenPairedPlayers;
    expect(unmatchedPlayer).toBeUndefined();
  });

  test("has the correct length when even", () => {
    expect(evenPairedPlayers.length).toBe(evenNumberOfPlayers.length / 2);
  });

  test("contains one of the top and one of the bottom players when even", () => {

    evenPairedPlayers.forEach(pair => {
      expect(evenTopAndBottomPlayers.top).toContain(pair.player1)
      expect(evenTopAndBottomPlayers.bottom).toContain(pair.player2)
    })


  });

  //tests for odd number of players
  const oddNumberOfPlayers = cleanedUpPlayers;
  const oddTopAndBottomPlayers = separateTopFromBottomPlayers(
    oddNumberOfPlayers
  );
  const oddPairedPlayers = pairPlayers(oddTopAndBottomPlayers);
  test("returns on unmatched player when odd", () => {
    const singlePairing = oddPairedPlayers[oddPairedPlayers.length - 1];
    expect(singlePairing.player1).not.toBeUndefined();
    expect(singlePairing.player2).toBeUndefined();
  });

  test("has the correct length when odd", () => {
    expect(oddPairedPlayers.length).toBe(
      Math.ceil(oddNumberOfPlayers.length / 2)
    );
  });

});

describe("updatePlayers()", () => {

  const newPlayers = updatePlayers(testMatches);

  test("returns an array of all players from an array of matches", () => {
    expect(newPlayers).toBeDefined();
    expect(newPlayers.length).toBe(testMatches.length * 2);
    expect(newPlayers.length).toBe(6);

  });

  test("check gamesWon changed for winners ", () => {


  });

  test("match Id added to each player", () => {
    for (let match of testMatches) {
      let playersOfTheMatch = newPlayers.filter(function (e) {
        return e.matchIds[0] === match.id;
      });
      expect(playersOfTheMatch.length).toBe(2);
    }
  });

  test("opponent Id added to each player", () => {
    for (let match of testMatches) {
      let player1Id = match.player1.id;
      let player2Id = match.player2.id;

      newPlayers.forEach(player => {
        if (player.id === player1Id) {
          expect(player.opponentIds).toContain(player2Id);
        }

        if (player.id === player2Id) {
          expect(player.opponentIds).toContain(player1Id);
        }
      })

    }

  });

  test("check gamesWon changed for winners ", () => {


  });
});
