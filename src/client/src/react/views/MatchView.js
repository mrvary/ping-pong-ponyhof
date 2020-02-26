import React from "react";

import ScoreBoard from "../components/ScoreBoard";
import Player from "../components/Player";

function MatchView({
  onlyShowNextPlayers,
  match,
  sendFinishedMatch,
  sendSets
}) {
  return (
    <div>
      {onlyShowNextPlayers ? (
        <NextPlayers match={match}></NextPlayers>
      ) : (
        <ScoreBoard match={match} />
      )}
    </div>
  );
}

function NextPlayers({ match }) {
  return (
    <div>
      <h2>Next Up</h2>
      <Player player={match.player1}></Player>
      <span>:</span>
      <Player player={match.player2}></Player>
    </div>
  );
}

export default MatchView;
