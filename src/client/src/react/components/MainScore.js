import React from "react";
import "./MainScore.css";

import PlayerScore from "../PlayerScore/PlayerScore";
import { setsWonPlayer1, setsWonPlayer2 } from "../lib";

function MainScore({ match, player1, player2 }) {
  return (
    <div className="main-score__container">
      <PlayerScore player={player1} score={setsWonPlayer1(match)} />
      <div className="main-score__delimiter">:</div>
      <PlayerScore player={player2} score={setsWonPlayer2(match)} />
    </div>
  );
}

export default MainScore;
