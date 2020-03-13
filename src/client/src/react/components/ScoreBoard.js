/**
 * @author Felix Breitenbach
 */
import React from "react";
import "./ScoreBoard.css";

import MainScore from "./MainScore";
import {
  isMatchFinished,
  setsWonPlayer1,
  setsWonPlayer2
} from "../../shared/lib";

const MAX_INPUT = 50;

function ScoreBoard({ match, sendSets, updateSets, addSet }) {
  const generateSelectOptions = () => {
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
                {generateSelectOptions()}
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
                {generateSelectOptions()}
              </select>
            </div>
          );
        })}
      </div>
      <div className="score-board__container">
        {isMatchFinished(match) && (
          <button onClick={sendSets(match)}>Spiel abschicken</button>
        )}
        {sets.length < 5 &&
          !isMatchFinished(match) &&
          everySetIsValid(match) && (
            <button onClick={addSet}>Satz hinzufügen</button>
          )}
      </div>
    </>
  );
}

/**
 * Determine if all sets are valid by adding up respective sets won by either player
 * @param {Match} match
 */
function everySetIsValid(match) {
  return setsWonPlayer1(match) + setsWonPlayer2(match) === match.sets.length;
}

export default ScoreBoard;
