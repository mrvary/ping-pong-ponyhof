import React from 'react';
import './MainScore.css';

import PlayerScore from './PlayerScore';

function MainScore() {
  const players = ['Marco Goebel', 'Felix Breitenbach'];

  return (
    <div className="scoreContainer">
      <PlayerScore player={players[0]} />
      <div>:</div>
      <PlayerScore player={players[1]} />
    </div>
  );
}

export default MainScore;
