const {
  _createPlayer,
  _pairPlayers,
  _shuffle,
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

describe('_shuffle()', () => {
  const a = _shuffle([1, 2, 3, 4]);
  const b = _shuffle([1, 2, 3, 4]);
  const c = _shuffle([1, 2, 3, 4]);
  test('shuffles an input array', () => {
    expect(a).not.toEqual(b);
    expect(b).not.toEqual(c);
    expect(a).not.toEqual(c);
  });

  test('still contains all elements', () => {
    expect(a.length).toBe(4);
    expect(a).toEqual(expect.arrayContaining([1, 2, 3, 4]));
  });
});

describe('_pairPlayers()', () => {
  const evenNumberOfPlayers = cleanedUpPlayers
    .map(player => ({ ...player, qttr: player.qttr + 100 }))
    .concat(cleanedUpPlayers);

  const evenTopAndBottomPlayers = _separateTopFromBottomPlayers(
    evenNumberOfPlayers
  );
  const evenPairedPlayers = _pairPlayers(evenTopAndBottomPlayers);

  test('returns no unmatched player when even', () => {
    const { unmatchedPlayer } = evenPairedPlayers;
    expect(unmatchedPlayer).toBeUndefined();
  });

  test('has the correct length when even', () => {
    const { pairings } = evenPairedPlayers;
    expect(pairings.length).toBe(evenNumberOfPlayers.length / 2);
  });

  test.todo('contains one of the top and one of the bottom players when even');

  const oddNumberOfPlayers = cleanedUpPlayers;
  const oddTopAndBottomPlayers = _separateTopFromBottomPlayers(
    oddNumberOfPlayers
  );
  const oddPairedPlayers = _pairPlayers(oddTopAndBottomPlayers);
  test('returns on unmatched player when odd', () => {
    const { unmatchedPlayer } = oddPairedPlayers;
    expect(unmatchedPlayer).not.toBeUndefined();
  });

  test('has the correct length when odd', () => {
    const { pairings } = oddPairedPlayers;
    expect(pairings.length).toBe(Math.floor(oddNumberOfPlayers.length / 2));
  });

  test.todo('contains one of the top and one of the bottom players when even');
});

describe('_createFreeTicketGame()', () => {
  test.todo('updates matchId and round on player');
  test.todo('sets freeTicket = true on returned match');
});
