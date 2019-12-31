import React from 'react';

import Title from './Title';
import ConnectionStatus from './ConnectionStatus';
import ScoreBoard from './ScoreBoard';

const match = {
  id: 0,
  player1: {
    id: 'PLAYER20',
    firstname: 'Achim',
    lastname: 'Amthor',
    clubname: 'SC Baldham-Vaterstetten',
    gamesWon: 5,
    matchIds: [0],
    qttr: 1351,
    active: true,
    hasFreeTicket: false
  },
  player2: {
    id: 'PLAYER3',
    firstname: 'Ulrich',
    lastname: 'Dietzel',
    clubname: 'TTC Friedberg',
    gamesWon: 1,
    matchIds: [0],
    qttr: 1111,
    active: true,
    hasFreeTicket: false
  },
  sets: [
    { player1: 11, player2: 8 },
    { player1: 8, player2: 11 },
    { player1: 10, player2: 12 },
    { player1: 15, player2: 13 },
    { player1: 4, player2: 11 }
  ],
  freeTicket: false
};

function Match({ appTitle, isConnected }) {
  return (
    <div>
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      <ScoreBoard match={match} />
    </div>
  );
}

export default Match;
