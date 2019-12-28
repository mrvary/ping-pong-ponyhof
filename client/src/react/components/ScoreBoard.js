import React from 'react';
import './ScoreBoard.css';

import MainScore from './MainScore';
import SetScore from './SetScore';

function ScoreBoard() {
  return (
    <div className="board-container">
      <MainScore />
      <SetScore />
    </div>
  );
}

export default ScoreBoard;
