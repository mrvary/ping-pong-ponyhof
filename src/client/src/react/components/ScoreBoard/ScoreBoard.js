import React from "react";
import "./ScoreBoard.css";

import MainScore from "../MainScore/MainScore";
import SetScore from "../SetScore/SetScore";

function ScoreBoard({ match }) {
  const showSets = () =>
    match.sets.map((set, index) => (
      <SetScore key={index} index={index} set={set} />
    ));

  return (
    <>
      <MainScore match={match} />
      <div className="score-board__container">{showSets()}</div>
    </>
  );
}

export default ScoreBoard;
