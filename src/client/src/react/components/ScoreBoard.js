import React from "react";
import "./ScoreBoard.css";

import MainScore from "./MainScore";
import SetScore from "./SetScore";

function ScoreBoard({ match, sendSets }) {
  const showSets = () =>
    match.sets.map((set, index) => (
      <SetScore key={index} index={index} set={set} />
    ));

  return (
    <>
      <MainScore match={match} />
      <div className="score-board__container">{showSets()}</div>
      <button onClick={sendSets(match)}>Send sets</button>
    </>
  );
}

export default ScoreBoard;
