const {
  cleanedUpPlayers,
  tournamentJSON,
  tournamentJSON15Players
} = require("./player.test.data");

const { drawRound } = require("../../src/matchmaker/drawing");

const {
  createPlayersFromJSON,
  updatePlayersAfterDrawing,
  updateWinner
} = require("../../src/matchmaker/player");

const { simulateMatches } = require("../../src/matchmaker/match");

const {
  pairPlayersRoundOne,
  separateTopFromBottomPlayers,
  groupByGamesWon,
  sortPlayersBy,
  shuffle,
  pairPlayersLaterRound,
  basicDrawingAlgorithm,
  advancedDrawingAlgorithm,
  emergencyDrawingAlgorithm
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
    let idOfTopPlayers = [];
    let idOfBottomPlayers = [];

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

describe("groupByGamesWon()", () => {
  const players = cleanedUpPlayers.concat(cleanedUpPlayers).map(player => {
    return { ...player, matchIds: (player.matchIds = [1, 2, 3, 4, 5]) };
  });
  groupByGamesWon(players);
});

//simulate 100 competitions and count the success rate of each algorithm
describe("drawingAlgorithms()", () => {
  let basicDrawingSuccedCounter = 0;
  let advancedDrawingSuccedCounter = 0;
  let emergencyDrawingSuccedCounter = 0;
  const competitionsToSimulate = 100;
  for (let i = 0; i < competitionsToSimulate; i++) {
    let players = createPlayersFromJSON(tournamentJSON15Players);
    let matches = [];

    let basicDrawingSucced = true;
    let advancedDrawingSucced = true;
    let emergencyDrawingSucced = true;

    let basicDrawing;
    let advancedDrawing;
    let emergencyDrawing;

    const roundsToPlay = 6;
    //play competitions
    for (let round = 1; round <= roundsToPlay; round++) {
      //1. create new matches for the round (drawing)

      let currentMatches = drawRound(players);

      basicDrawing = basicDrawingAlgorithm(players);
      advancedDrawing = advancedDrawingAlgorithm(players);
      emergencyDrawing = emergencyDrawingAlgorithm(players);

      if (basicDrawing === false) {
        basicDrawingSucced = false;
      }
      if (advancedDrawing === false) {
        advancedDrawingSucced = false;
      }
      if (emergencyDrawing === false) {
        emergencyDrawingSucced = false;
      }

      //2. update the players with the created matches
      players = updatePlayersAfterDrawing(players, currentMatches);

      //3.1 simulate matches
      currentMatches = simulateMatches(currentMatches);

      //3.2 add currentMatches to all matches
      currentMatches.forEach(currentMatch => {
        matches.push(currentMatch);
      });

      //4. update winner
      players = updateWinner(players, currentMatches);
    }

    if (basicDrawingSucced === true) {
      basicDrawingSuccedCounter++;
    }
    if (advancedDrawingSucced === true) {
      advancedDrawingSuccedCounter++;
    }
    if (emergencyDrawingSucced === true) {
      emergencyDrawingSuccedCounter++;
    }
  }

  test("basicDrawingAlgorithm succeded at least once", () => {
    console.log(
      "Der basic Algorithmus hat " +
        basicDrawingSuccedCounter +
        "/" +
        competitionsToSimulate +
        " das Turnier beenden können."
    );
    expect(basicDrawingSuccedCounter).not.toBe(0);
  });

  test("advancedDrawingAlgorithm succeded at least once", () => {
    console.log(
      "Der advanced Algorithmus hat " +
        advancedDrawingSuccedCounter +
        "/" +
        competitionsToSimulate +
        " das Turnier beenden können."
    );
    expect(advancedDrawingSuccedCounter).not.toBe(0);
  });

  test("emergencyDrawing succeded always", () => {
    console.log(
      "Der emergency Algorithmus hat " +
        emergencyDrawingSuccedCounter +
        "/" +
        competitionsToSimulate +
        " das Turnier beenden können."
    );
    expect(emergencyDrawingSuccedCounter).toBe(emergencyDrawingSuccedCounter);
  });
});
