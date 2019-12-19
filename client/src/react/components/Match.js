import React from 'react';

import Title from './Title';
import ConnectionStatus from './ConnectionStatus';
import ScoreBoard from './ScoreBoard';

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
