const {
  cleanedUpPlayers,
  tournamentJSON,
  tournamentJSON15Players
} = require("./player.test.data");

const { createPlayersFromJSON } = require("../../src/matchmaker/player");

const {
  pairPlayersRoundOne,
  separateTopFromBottomPlayers,
  sortPlayersBy,
  shuffle
} = require("../../src/matchmaker/drawingAlgorithms");

describe("separateTopFromBottomPlayers()", () => {
  const evenNumberOfPlayers = cleanedUpPlayers
    .map(player => ({ ...player, qttr: player.qttr + 100 }))
    .concat(cleanedUpPlayers);

  const { top, bottom } = separateTopFromBottomPlayers(evenNumberOfPlayers);

  test("splits an even list in half", () => {
    expect(top.length).toBe(bottom.length);
  });

  test("keeps the sorting by qttr", () => {
    top.forEach(topPlayer => {
      for (let bottomPlayer of bottom) {
        expect(topPlayer.qttr).toBeGreaterThanOrEqual(bottomPlayer.qttr);
      }
    });
  });
  test("freeTicket player in bottom half", () => {
    const playersWithFreeTicketPlayer = createPlayersFromJSON(
      tournamentJSON15Players
    );
    const { bottom } = separateTopFromBottomPlayers(
      playersWithFreeTicketPlayer
    );
    expect(bottom).toContainEqual({
      id: "FreeTicket",
      gamesWon: 0,
      matchIds: [],
      opponentIds: [],
      qttr: 0
    });
  });
});

describe("pairPlayersRoundOne()", () => {
  const playersWithFreeTicketPlayer = createPlayersFromJSON(
    tournamentJSON15Players
  );
  const { bottom, top } = separateTopFromBottomPlayers(
    playersWithFreeTicketPlayer
  );
  const pairing = pairPlayersRoundOne({ top, bottom });

  test("has the correct length", () => {
    expect(pairing.length).toBe(playersWithFreeTicketPlayer.length / 2);
  });

  test("each pair contains one of the top and one of the bottom players", () => {
    idOfTopPlayers = [];
    idOfBottomPlayers = [];

    top.forEach(e => {
      idOfTopPlayers.push(e.id);
    });

    bottom.forEach(e => {
      idOfBottomPlayers.push(e.id);
    });

    pairing.forEach(pair => {
      expect(idOfTopPlayers).toContain(pair.player1);
      expect(idOfBottomPlayers).toContain(pair.player2);
    });
  });

  test("different pairing each time", () => {
    const pairingToCompare = pairPlayersRoundOne({ top, bottom });

    let pairing_Strings = [];
    let pairingToCompare_Strings = [];

    pairing.forEach(e => {
      pairing_Strings.push(JSON.stringify(e));
    });

    pairingToCompare.forEach(e => {
      pairingToCompare_Strings.push(JSON.stringify(e));
    });

    //return duplicated items - doesn't work with json
    var samePairings = pairing_Strings.filter(function(val) {
      return pairingToCompare_Strings.indexOf(val) != -1;
    });

    //if x matches, not more than x/2 the same matches are allowed -- can fail
    expect(samePairings.length).toBeLessThanOrEqual(pairing.length / 2);
  });
});

describe("shuffle()", () => {
  // can fail, maybe test differently?
  const a = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const b = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const c = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  test("shuffles an input array", () => {
    expect(a).not.toEqual(b);
    expect(b).not.toEqual(c);
    expect(a).not.toEqual(c);
  });

  test("still contains all elements", () => {
    expect(a.length).toBe(10);
    expect(a).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  });
});
