import React from 'react';
import './ScoreBoard.css';

import MainScore from './MainScore';

function ScoreBoard() {
  return (
    <div className="boardContainer">
      <h1>ScoreBoard</h1>
      <MainScore />
    </div>
  );
}

export default ScoreBoard;
