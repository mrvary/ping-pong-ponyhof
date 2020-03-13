/**
 * @author Felix Breitenbach
 */
import React from "react";
import "./MainScore.css";

import PlayerScore from "./PlayerScore";
import { setsWonPlayer1, setsWonPlayer2 } from "../../shared/lib";

function MainScore({ match }) {
  return (
    <div className="main-score__container">
      <PlayerScore player={match.player1} score={setsWonPlayer1(match)} />
      <PlayerScore player={match.player2} score={setsWonPlayer2(match)} />
    </div>
  );
}

export default MainScore;
