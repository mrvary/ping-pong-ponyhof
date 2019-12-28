import React from 'react';
import './Score.css';

function Score({ score }) {
  return <div className="btn">{score ? score : 0}</div>;
}

export default Score;
