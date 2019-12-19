import React from 'react';
import './PlayerScore.css';

import Player from './Player';
import Score from './Score';

function PlayerScore({ player, score }) {
  let currentScore = score ? score : 0

  return (
    <div className="btnContainer">
      <Player player={player} />
      <Score score={currentScore} />
    </div>
  );
}

export default PlayerScore;
