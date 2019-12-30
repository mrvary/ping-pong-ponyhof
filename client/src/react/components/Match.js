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
    { p1: 11, p2: 8 },
    { p1: 8, p2: 11 },
    { p1: 8, p2: 11 },
    { p1: 11, p2: 8 },
    { p1: 8, p2: 11 }
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
