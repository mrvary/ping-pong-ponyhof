import React from "react";
import "./ScoreBoard.css";

import MainScore from "./MainScore";
import SetScore from "./SetScore";

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
