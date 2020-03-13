/**
 * @author Felix Breitenbach
 */
import React from "react";
import "./PlayerScore.css";

import Player from "./Player";

function Score({ score }) {
  return <div className="player-score__score">{score ? score : 0}</div>;
}

function PlayerScore({ player, score }) {
  return (
    <div className="player-score__container">
      <Player player={player} />
      <Score score={score} />
    </div>
  );
}

export default PlayerScore;
