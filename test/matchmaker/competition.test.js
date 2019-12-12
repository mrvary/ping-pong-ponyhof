const { createPlayer } = require('../../src/matchmaker/competition');
const { inputPlayers } = require('./competition.test.data');

describe('the create player function', () => {
  test('creates the expected player object', () => {
    const expectedPlayer = {
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

    const createdPlayer = createPlayer(inputPlayers[0]);

    expect(createdPlayer).toEqual(expectedPlayer);
  });
});
