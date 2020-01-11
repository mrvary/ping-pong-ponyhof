const testPairing = [{ player1: 'PLAYER13', player2: 'PLAYER4' },
{ player1: 'PLAYER6', player2: 'PLAYER5' },
{ player1: 'PLAYER11', player2: 'PLAYER8' },
{ player1: 'PLAYER9', player2: 'PLAYER12' },
{ player1: 'PLAYER16', player2: 'PLAYER7' },
{ player1: 'PLAYER14', player2: 'PLAYER2' },
{ player1: 'PLAYER15', player2: 'PLAYER3' },
{ player1: 'PLAYER10', player2: 'PLAYER1' }];

const testPairingWithFreeTicket = [{ player1: 'PLAYER15', player2: 'PLAYER3' },
{ player1: 'PLAYER12', player2: 'PLAYER1' },
{ player1: 'PLAYER9', player2: 'PLAYER4' },
{ player1: 'PLAYER14', player2: 'PLAYER5' },
{ player1: 'PLAYER13', player2: 'FreeTicket' },
{ player1: 'PLAYER10', player2: 'PLAYER2' },
{ player1: 'PLAYER6', player2: 'PLAYER7' },
{ player1: 'PLAYER11', player2: 'PLAYER8' }];

module.exports = { testPairing, testPairingWithFreeTicket };
