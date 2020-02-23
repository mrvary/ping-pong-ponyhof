const { setsWonPlayer1, setsWonPlayer2 } = require("./main-score-state-func");

describe("setsWon", () => {
  test("sets is empty -> pl1: 0, pl2: 0", () => {
    const match = { sets: [] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(0);
  });

  test("player1 wins with 11 to 8 -> pl1: 1, pl2: 0", () => {
    const match = { sets: [{ player1: 11, player2: 8 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(1);
    expect(setsPlayer2).toBe(0);
  });

  test("player2 wins with 11 to 8 -> pl1: 0, pl2: 1", () => {
    const match = { sets: [{ player1: 8, player2: 11 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(1);
  });

  test("player1 wins with 12 to 10 -> pl1: 1, pl2: 0", () => {
    const match = { sets: [{ player1: 12, player2: 10 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(1);
    expect(setsPlayer2).toBe(0);
  });

  test("player2 wins with 12 to 10 -> pl1: 0, pl2: 1", () => {
    const match = { sets: [{ player1: 10, player2: 12 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(1);
  });

  test("player1 does not won with 11 to 10 -> pl1: 0, pl2: 0", () => {
    const match = { sets: [{ player1: 11, player2: 10 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(0);
  });

  test("player2 does not won with 11 to 10 -> pl1: 0, pl2: 0", () => {
    const match = { sets: [{ player1: 10, player2: 11 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(0);
  });

  test("player1 wins with 14 to 12 -> pl1: 1, pl2: 0", () => {
    const match = { sets: [{ player1: 14, player2: 12 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(1);
    expect(setsPlayer2).toBe(0);
  });

  test("player2 wins with 14 to 12 -> pl1: 0, pl2: 1", () => {
    const match = { sets: [{ player1: 12, player2: 14 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(1);
  });

  test("player1 does not won with 15 to 14 -> pl1: 0, pl2: 0", () => {
    const match = { sets: [{ player1: 15, player2: 14 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(0);
  });

  test("player2 does not won with 15 to 14 -> pl1: 0, pl2: 0", () => {
    const match = { sets: [{ player1: 14, player2: 15 }] };

    const setsPlayer1 = setsWonPlayer1(match);
    const setsPlayer2 = setsWonPlayer2(match);

    expect(setsPlayer1).toBe(0);
    expect(setsPlayer2).toBe(0);
  });
});
