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
});
// function createStateResponseData({
//   tableNumber,
//   competitions,
//   matchesWithPlayers
// }) {
//   const currentlyRunningCompetition = competitions.find(
//     ({ status }) =>
//       status === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY ||
//       status === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
//   );

//   if (!currentlyRunningCompetition) {
//     return {
//       roundStarted: false,
//       tableNumber
//     };
//   }

//   const { state } = currentlyRunningCompetition;
//   const { player1, player2, match } = matchesWithPlayers[tableNumber];

//   if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY) {
//     return {
//       roundStarted: false,
//       tableNumber,
//       match: { ...match, player1, player2 }
//     };
//   }

//   if (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE) {
//     return {
//       roundStarted: true,
//       tableNumber,
//       match: { ...match, player1, player2 }
//     };
//   }
// }
