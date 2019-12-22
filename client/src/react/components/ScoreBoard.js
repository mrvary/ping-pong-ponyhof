import React from 'react';
import './ScoreBoard.css';

import MainScore from './MainScore';

function ScoreBoard() {
  return (
    <div className="board-container">
      <h1>ScoreBoard</h1>
      <MainScore />
    </div>
  );
}

export default ScoreBoard;
