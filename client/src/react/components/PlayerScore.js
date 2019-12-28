import React from 'react';
import './PlayerScore.css';

import Player from './Player';
import Score from './Score';

function PlayerScore({ player, score }) {

  return (
    <div className="btn-container">
      <Player player={player} />
      <Score score={score} />
    </div>
  );
}

export default PlayerScore;
