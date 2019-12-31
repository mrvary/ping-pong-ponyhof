const { setsWon } = require('./main-score-state-func');

describe('calculateResult', () => {
  test('sets is empty -> pl1: 0, pl2: 0', () => {
    const match = { sets: [] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(0);
  });

  test('player1 wons with 11 to 8 -> pl1: 1, pl2: 0', () => {
    const match = { sets: [{ player1: 11, player2: 8 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(1);
    expect(setsWonPlayer2).toBe(0);
  });

  test('player2 wons with 11 to 8 -> pl1: 0, pl2: 1', () => {
    const match = { sets: [{ player1: 8, player2: 11 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(1);
  });

  test('player1 wons with 12 to 10 -> pl1: 1, pl2: 0', () => {
    const match = { sets: [{ player1: 12, player2: 10 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(1);
    expect(setsWonPlayer2).toBe(0);
  });

  test('player2 wons with 12 to 10 -> pl1: 0, pl2: 1', () => {
    const match = { sets: [{ player1: 10, player2: 12 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(1);
  });

  test('player1 does not won with 11 to 10 -> pl1: 0, pl2: 0', () => {
    const match = { sets: [{ player1: 11, player2: 10 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(0);
  });

  test('player2 does not won with 11 to 10 -> pl1: 0, pl2: 0', () => {
    const match = { sets: [{ player1: 10, player2: 11 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(0);
  });

  test('player1 wons with 14 to 12 -> pl1: 1, pl2: 0', () => {
    const match = { sets: [{ player1: 14, player2: 12 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(1);
    expect(setsWonPlayer2).toBe(0);
  });

  test('player2 wons with 14 to 12 -> pl1: 0, pl2: 1', () => {
    const match = { sets: [{ player1: 12, player2: 14 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(1);
  });

  test('player1 does not won with 15 to 14 -> pl1: 0, pl2: 0', () => {
    const match = { sets: [{ player1: 15, player2: 14 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(0);
  });

  test('player2 does not won with 15 to 14 -> pl1: 0, pl2: 0', () => {
    const match = { sets: [{ player1: 14, player2: 15 }] };

    const setsWonPlayer1 = setsWon(match, 'player1', 'player2');
    const setsWonPlayer2 = setsWon(match, 'player2', 'player1');

    expect(setsWonPlayer1).toBe(0);
    expect(setsWonPlayer2).toBe(0);
  });
});
