import React from 'react';
import './SetScore.css';

function Score({ score }) {
  return <div className="set-score__score">{score ? score : 0}</div>;
}

function SetScore({score}) {
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
