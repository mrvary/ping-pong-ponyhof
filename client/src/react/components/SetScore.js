import React from 'react';
import './SetScore.css';

import Score from './Score';

function SetScore({}) {
  return (
    <div>
      <div className="set-score__container">
        <h3 className="set-score__title">1. Satz</h3>
        <Score />
        <div className="set-score__delimiter">:</div>
        <Score />
      </div>
    </div>
  );
}

export default SetScore;
