import React from "react";
import "./ScoreBoard.css";

import MainScore from "../MainScore/MainScore";
import SetScore from "./SetScore";

function ScoreBoard({ match, player1, player2 }) {
  const showSets = () =>
    match.sets.map((set, index) => (
      <SetScore key={index} index={index} set={set} />
    ));

  return (
    <>
      <MainScore match={match} player1={player1} player2={player2} />
      <div className="score-board__container">{showSets()}</div>
    </>
  );
}

export default ScoreBoard;
