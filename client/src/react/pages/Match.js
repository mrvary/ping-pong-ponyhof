import React from 'react';

import Title from '../components/Title';
import ConnectionStatus from '../components/ConnectionStatus/ConnectionStatus';
import ScoreBoard from '../components/ScoreBoard/ScoreBoard';

function Match({ appTitle, isConnected }) {
  return (
    <div>
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      <ScoreBoard />
    </div>
  );
}

export default Match;
