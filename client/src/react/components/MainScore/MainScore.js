import React from 'react';
import './MainScore.css';

import PlayerScore from '../PlayerScore/PlayerScore';

function MainScore() {
  const players = ['Marco Goebel', 'Felix Breitenbach'];

  return (
    <div className="main-score__container">
      <PlayerScore player={players[0]} />
      <div className="main-score__delimiter">:</div>
      <PlayerScore player={players[1]} />
    </div>
  );
}

export default MainScore;
