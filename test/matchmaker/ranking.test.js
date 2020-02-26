const {
  createCurrentRanking,
  calculateBHZ,
  calculateNewTTR,
  getMatchesInvolved,
  addMatchDetails,
  createMatchResult,
  getParameterByPlayerId
} = require("../../src/matchmaker/ranking");

const {

  playersAfterUpdateWinner
} = require("./player.test.data");

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
describe("addMatchDetails()", () => {});
describe("getParameterByPlayerId()", () => {});
describe("createMatchResult()", () => {});
