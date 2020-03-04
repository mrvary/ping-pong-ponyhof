import React, { useState } from "react";
import "./ScoreBoard.css";

import MainScore from "./MainScore";
import Set from "./Set";
import { isMatchFinished } from "../../shared/lib";

const MAX_INPUT = 50;

function ScoreBoard({ match, sendSets, updateSets, addSet }) {
  // const showSets = () =>
  //   match.sets.map((set, index) => <Set key={index} index={index} set={set} />);
  const generateOptions = () => {
    const numberArray = [...Array(MAX_INPUT).keys()];
    const options = numberArray.map(number => (
      <option key={number} value={number}>
        {number}
      </option>
    ));
    return options;
  };

  const { sets } = match;
  return (
    <>
      <MainScore match={match} />
      <div className="score-board__container">
        {sets.map((set, index) => {
          return (
            <div key={index} className="score-board__set-container">
              <select
                list="score-numbers"
                className="score-board__set-container-item"
                type="number"
                min="0"
                value={set.player1}
                onChange={updateSets(match)("player1")(index)}
              >
                {generateOptions()}
              </select>
              <span className="score-board__set-delimiter">:</span>
              <select
                list="score-numbers"
                className="score-board__set-container-item"
                type="number"
                min="0"
                value={set.player2}
                onChange={updateSets(match)("player2")(index)}
              >
                {generateOptions()}
              </select>
            </div>
          );
        })}
      </div>
      <div className="score-board__container">
        {isMatchFinished(match) && (
          <button onClick={sendSets(match)}>Spiel abschicken</button>
        )}
        {sets.length < 5 && !isMatchFinished(match) && (
          <button onClick={addSet}>Satz hinzufügen</button>
        )}
      </div>
    </>
  );
}

export default ScoreBoard;
