import React from 'react';

import Title from './Title';
import ConnectionStatus from './ConnectionStatus';
import ScoreBoard from './ScoreBoard';

const match = {
  id: 0,
  player1: {
    id: 'PLAYER20',
    firstname: 'Achim Copy',
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
  result: [],
  sets: [],
  freeTicket: false
};

function Match({ appTitle, isConnected }) {
  return (
    <div>
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      <ScoreBoard />
    </div>
  );
}

export default Match;
