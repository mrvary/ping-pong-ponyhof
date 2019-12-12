import React from 'react';
import './WaitForRound.css';

function WaitForRound({ connected, matchStarted }) {
  if (!connected) {
    return null;
  }

  if (matchStarted) {
    return null;
  }

  return (
    <div className="ball-container">
      <div className="ball"></div>
      <div className="shadow"></div>
    </div>
  );
}

export default WaitForRound;
