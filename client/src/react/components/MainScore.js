import React from 'react';
import './MainScore.css';

import PlayerScore from './PlayerScore';

function MainScore({ match }) {
  const { player1, player2 } = match;

  const calculateResult = player => {
    let result = 0;

    match.sets.forEach(set => {
      if (player === 1) {
        if (set.p1 >= 11 && set.p1 > set.p2) {
          result++;
        }
      } else {
        if (set.p2 >= 11 && set.p2 > set.p1) {
          result++;
        }
      }
    });

    return result;
  };

  return (
    <div className="main-score__container">
      <PlayerScore player={player1} score={calculateResult(1)} />
      <div className="main-score__delimiter">:</div>
      <PlayerScore player={player2} score={calculateResult(2)}/>
    </div>
  );
}

export default MainScore;
