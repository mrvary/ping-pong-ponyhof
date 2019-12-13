const {
  _createPlayer,
  _sortPlayersBy,
  _separateTopFromBottomPlayers,
  createPlayersFromJSON
} = require('../../src/matchmaker/competition');

const {
  inputPlayers,
  cleanedUpPlayers,
  tournamentJSON
} = require('./competition.test.data');

const EXPECTED_PLAYER = {
  id: 'PLAYER1',
  firstname: 'Gerhard',
  lastname: 'Acker',
  clubname: 'ESV SF Neuaubing',
  gamesWon: 0,
  matchIds: [],
  qttr: 1415,
  active: true,
  hasFreeTicket: false
};

describe('createPlayer()', () => {
  test('returns the correct object', () => {
    const createdPlayer = _createPlayer(inputPlayers[0]);

    expect(createdPlayer).toEqual(EXPECTED_PLAYER);
  });
});

describe('createPlayers()', () => {
  const players = createPlayersFromJSON(tournamentJSON);
  test('returns a list of players', () => {
    expect(players).toHaveLength(16);
  });

  test('with correct player objects', () => {
    expect(players[0]).toEqual(EXPECTED_PLAYER);
  });
});

describe('sortPlayersBy()', () => {
  test('sorts players by qttr (ascending)', () => {
    const [p1, p2, p3] = _sortPlayersBy(cleanedUpPlayers, 'qttr');
    expect(p1.qttr).toBeGreaterThanOrEqual(p2.qttr);
    expect(p2.qttr).toBeGreaterThanOrEqual(p3.qttr);
  });

  test('sorts players by games won (ascending)', () => {
    const [p1, p2, p3] = _sortPlayersBy(cleanedUpPlayers, 'gamesWon');
    expect(p1.gamesWon).toBeGreaterThanOrEqual(p2.gamesWon);
    expect(p2.gamesWon).toBeGreaterThanOrEqual(p3.gamesWon);
  });
});

describe('_separateTopFromBottomPlayers()', () => {
  const evenNumberOfPlayers = cleanedUpPlayers
    .map(player => ({ ...player, qttr: player.qttr + 100 }))
    .concat(cleanedUpPlayers);

  test('splits an even list in half', () => {
    const { top, bottom } = _separateTopFromBottomPlayers(evenNumberOfPlayers);
    expect(top.length).toBe(bottom.length);
  });

  test('keeps the sorting by qttr', () => {
    const { top, bottom } = _separateTopFromBottomPlayers(evenNumberOfPlayers);

    top.forEach(topPlayer => {
      for (let bottomPlayer of bottom) {
        expect(topPlayer.qttr).toBeGreaterThanOrEqual(bottomPlayer.qttr);
      }
    });
  });

  test('splits an odd list in a bigger and smaller half', () => {
    const oddNumberOfPlayers = cleanedUpPlayers;
    const { top, bottom } = _separateTopFromBottomPlayers(oddNumberOfPlayers);
    expect(top.length).toBe(bottom.length + 1);
  });
});
