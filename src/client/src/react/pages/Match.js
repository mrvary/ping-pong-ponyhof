import React from "react";

import Title from "../components/Title";
import ConnectionStatus from "../components/ConnectionStatus/ConnectionStatus";
import ScoreBoard from "../components/ScoreBoard/ScoreBoard";

function Match({ appTitle, isConnected, matchWithPlayers }) {
  return (
    <div>
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      <ScoreBoard
        match={matchWithPlayers.match}
        player1={matchWithPlayers.player1}
        player2={matchWithPlayers.player2}
      />
    </div>
  );
}

export default Match;
