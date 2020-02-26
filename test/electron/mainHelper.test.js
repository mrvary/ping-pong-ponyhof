const {
  createStateResponseData
} = require("../../src/electron/helper/mainHelper");

const {
  expectedCompetitionWithDefaultValues
} = require("../models/competition.test.data");

const { COMPETITION_STATE } = require("../../src/modules/models/competition");

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
const matchesWithPlayers = { 4: expectedMatchWithPLayers };

beforeAll(() => {
  competitions = [expectedCompetitionWithDefaultValues];
});

describe("createStateResponseData()", () => {
  test(COMP_CREATED + " returns {roundStarted, tableNumber}", () => {
    // ACT
    const responseData = createStateResponseData({
      tableNumber: initialTableNumber,
      competitions,
      matchesWithPlayers
    });

    // ASSERT
    const { roundStarted, tableNumber, match } = responseData;
    expect(match).toBeUndefined();
    expect(tableNumber).toBe(initialTableNumber);
    expect(roundStarted).toBeFalsy();
  });

  test(COMP_READY_ROUND_READY + " returns {roundStarted, tableNumber}", () => {
    // ACT
    const responseData = createStateResponseData({
      tableNumber: initialTableNumber,
      competitions: competitions.map(competition => {
        return { ...competition, status: COMP_READY_ROUND_READY };
      }),
      matchesWithPlayers
    });

    // ASSERT
    const { roundStarted, tableNumber, match } = responseData;
    expect(match).toBeUndefined();
    expect(tableNumber).toBe(initialTableNumber);
    expect(roundStarted).toBeFalsy();
  });

  test(
    COMP_ACTIVE_ROUND_READY + " returns {roundStarted, tableNumber, match}",
    () => {
      // ACT
      const responseData = createStateResponseData({
        tableNumber: initialTableNumber,
        competitions: competitions.map(competition => {
          return { ...competition, status: COMP_ACTIVE_ROUND_READY };
        }),
        matchesWithPlayers
      });

      // ASSERT
      const { roundStarted, tableNumber, match } = responseData;
      expect(match).toEqual(expectedResponseMatch);
      expect(tableNumber).toBe(initialTableNumber);
      expect(roundStarted).toBeFalsy();
    }
  );
  test.todo(
    "COMP_ACTIVE_ROUND_ACTIVE return {roundStarted, tableNumber, match}"
  );
});
