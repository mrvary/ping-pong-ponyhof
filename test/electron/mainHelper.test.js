const {
  createStateResponseData
} = require("../../src/electron/helper/mainHelper");

const {
  expectedCompetitionWithDefaultValues
} = require("../models/competition.test.data");

const { COMPETITION_STATE } = require("../../src/shared/models/competition");

const {
  COMP_CREATED,
  COMP_READY_ROUND_READY,
  COMP_READY_ROUND_ACTIVE,
  COMP_ACTIVE_ROUND_READY,
  COMP_ACTIVE_ROUND_ACTIVE
} = COMPETITION_STATE;

const {
  expectedMatchWithPLayers,
  expectedResponseMatch
} = require("./mainHelper.test.data");

let competitions = null;
const initialTableNumber = 4;
const matchesWithPlayers = [ expectedMatchWithPLayers ];

beforeAll(() => {
  competitions = [expectedCompetitionWithDefaultValues];
});

describe("createStateResponseData()", () => {
  test(COMP_CREATED + " returns {roundStarted, tableNumber}", () => {
    // ACT
    const responseData = createStateResponseData(initialTableNumber, competitions[0], matchesWithPlayers);

    // ASSERT
    const { roundStarted, tableNumber, match } = responseData;
    expect(match).toBeUndefined();
    expect(tableNumber).toBe(initialTableNumber);
    expect(roundStarted).toBeFalsy();
  });

  test(COMP_READY_ROUND_READY + " returns {roundStarted, tableNumber}", () => {
    // ARRANGE
      competitions = competitions.map(competition => {
          return { ...competition, state: COMP_READY_ROUND_READY };
      });

    // ACT
    const responseData = createStateResponseData(
      initialTableNumber,
        competitions[0],
      matchesWithPlayers
    );

    // ASSERT
    const { roundStarted, tableNumber, match } = responseData;
    expect(match).toBeUndefined();
    expect(tableNumber).toBe(initialTableNumber);
    expect(roundStarted).toBeFalsy();
  });

  test(
    COMP_ACTIVE_ROUND_READY + " returns {roundStarted, tableNumber, match}",
    () => {
        // ARRANGE
        competitions = competitions.map(competition => {
            return { ...competition, state: COMP_ACTIVE_ROUND_READY };
        });

      // ACT
      const responseData = createStateResponseData(
          initialTableNumber,
          competitions[0],
        matchesWithPlayers
      );

      // ASSERT
      const { roundStarted, tableNumber, match } = responseData;
      expect(match).toEqual(expectedResponseMatch);
      expect(tableNumber).toBe(initialTableNumber);
      expect(roundStarted).toBeFalsy();
    }
  );

  test(
    COMP_ACTIVE_ROUND_ACTIVE + " return {roundStarted, tableNumber, match}",
    () => {
        // ARRANGE
        competitions = competitions.map(competition => {
            return { ...competition, state: COMP_ACTIVE_ROUND_ACTIVE };
        });

      // ACT
      const responseData = createStateResponseData(
        initialTableNumber,
          competitions[0],
        matchesWithPlayers
      );

      // ASSERT
      const { roundStarted, tableNumber, match } = responseData;
      expect(match).toEqual(expectedResponseMatch);
      expect(tableNumber).toBe(initialTableNumber);
      expect(roundStarted).toBeTruthy();
    }
  );
});
