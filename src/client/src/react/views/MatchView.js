import React from "react";

import ScoreBoard from "../components/ScoreBoard";
import Player from "../components/Player";

function MatchView({
  onlyShowNextPlayers,
  matchWithPlayers,
  sendFinishedMatch,
  sendSets
}) {
  return (
    <div>
      {onlyShowNextPlayers ? (
        <NextPlayers matchWithPlayers={matchWithPlayers}></NextPlayers>
      ) : (
        <ScoreBoard
          match={matchWithPlayers.match}
          player1={matchWithPlayers.player1}
          player2={matchWithPlayers.player2}
        />
      )}
    </div>
  );
}

function NextPlayers({ matchWithPlayers }) {
  return (
    <div>
      <h2>Next Up</h2>
      <Player player={matchWithPlayers.player1}></Player>
      <span>:</span>
      <Player player={matchWithPlayers.player2}></Player>
    </div>
  );
}

export default MatchView;
