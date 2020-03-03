import React, { useState } from "react";
import "./ScoreBoard.css";

import MainScore from "./MainScore";
import Set from "./Set";
import { isMatchFinished } from "../../shared/lib";

function ScoreBoard({ match, sendSets, updateSets, addSet }) {
  // const showSets = () =>
  //   match.sets.map((set, index) => <Set key={index} index={index} set={set} />);

  const { sets } = match;
  return (
    <>
      <MainScore match={match} />
      <div className="score-board__container">
        {sets.map((set, index) => {
          return (
            <div key={index} className="score-board__set-container">
              <input
                className="score-board__set-container-item"
                type="number"
                value={set.player1}
                onChange={updateSets(match)("player1")(index)}
              ></input>
              <input
                className="score-board__set-container-item"
                type="number"
                value={set.player2}
                onChange={updateSets(match)("player2")(index)}
              ></input>
            </div>
          );
        })}
      </div>
      <div className="score-board__container">
        {isMatchFinished(match) && (
          <button onClick={sendSets(match)}>Spiel abschicken</button>
        )}
        <button onClick={sendSets(match)}>Spiel abschicken</button>
        {sets.length < 5 && !isMatchFinished(match) && (
          <button onClick={addSet}>Satz hinzufügen</button>
        )}
      </div>
    </>
  );
}

export default ScoreBoard;
