import React from 'react';
import './ScoreBoard.css';

import MainScore from './MainScore';
import SetScore from './SetScore';

function ScoreBoard({ match }) {
  const showSets = () => match.sets.map((set, i) => <SetScore key={i} index={i} set={set} />);

  return (
    <>
      <MainScore match={match} />
      <div className="score-board__container">{showSets()}</div>
    </>
  );
}

export default ScoreBoard;
