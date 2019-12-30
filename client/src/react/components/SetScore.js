import React from 'react';
import './SetScore.css';

function Score({ score }) {
  return <div className="set-score__score">{score ? score : 0}</div>;
}

function SetScore({ index, set }) {
  const { p1, p2 } = set;

  return (
    <div>
      <div className="set-score__container">
        <h3 className="set-score__title">{index + 1}. Satz</h3>
        <Score score={p1} />
        <div className="set-score__delimiter">:</div>
        <Score score={p2} />
      </div>
    </div>
  );
}

export default SetScore;
