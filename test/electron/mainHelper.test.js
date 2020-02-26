const {
  createStateResponseData
} = require("../../src/electron/helper/mainHelper");
const {
  expectedCompetitionWithDefaultValues
} = require("../models/competition.test.data");
const { mockedMatchFinished } = require("./mainHelper.test.data");

describe("createStateResponseData()", () => {
  test("COMP_CREATED: return {roundStarted, tableNumber}", () => {
    // ARRANGE
    const competitions = [expectedCompetitionWithDefaultValues];

    // ACT
    const responseData = createStateResponseData({
      tableNumber: 4,
      competitions,
      matchesWithPlayers: mockedMatchFinished
    });

    // ASSERT
    const { roundStarted, tableNumber, match } = responseData;
    expect(match).toBeUndefined();
    expect(tableNumber).toBe(4);
    expect(roundStarted).toBeFalsy();
  });

  test.todo("COMP_READY_ROUND_READY");
  test.todo("COMP_ACTIVE_ROUND_READY");
  test.todo("COMP_ACTIVE_ROUND_ACTIVE");
});
