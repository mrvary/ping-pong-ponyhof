import React from 'react';
import './MainScore.css';

import PlayerScore from './PlayerScore';
import { setsWon } from './main-score-state-func';

function MainScore({ match }) {
  const { player1, player2 } = match;

  return (
    <div className="main-score__container">
      <PlayerScore player={player1} score={setsWon(match, 'player1', 'player2')} />
      <div className="main-score__delimiter">:</div>
      <PlayerScore player={player2} score={setsWon(match, 'player2', 'player1')} />
    </div>
  );
}

export default MainScore;
