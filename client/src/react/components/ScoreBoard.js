import React from 'react';
import './ScoreBoard.css';

import MainScore from './MainScore';
import SetScore from './SetScore';

function ScoreBoard() {
  return (
    <>
      <MainScore />
      <div className="score-board__container">
        <SetScore />
        <SetScore />
        <SetScore />
        <SetScore />
        <SetScore />
        <SetScore />
      </div>
    </>
  );
}

export default ScoreBoard;
