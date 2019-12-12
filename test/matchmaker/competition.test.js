const {
  createPlayer,
  createPlayersFromJSON
} = require('../../src/matchmaker/competition');
const { inputPlayers, tournamentJSON } = require('./competition.test.data');

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
    const createdPlayer = createPlayer(inputPlayers[0]);

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
