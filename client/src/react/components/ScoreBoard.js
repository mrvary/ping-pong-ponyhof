import React from 'react';
import './ScoreBoard.css';

import MainScore from './MainScore';
import SetScore from './SetScore';

function ScoreBoard({ match }) {
  return (
    <>
      <MainScore match={match} />
      <div className="score-board__container">
        {match.sets.map((set, i) => (
          <SetScore key={i} index={i} set={set} />
        ))}
      </div>
    </>
  );
}

export default ScoreBoard;
