/**
 * @author Felix Breitenbach
 */
import React from "react";
import "./Set.css";

function Score({ score }) {
  return <div className="set__score">{score ? score : 0}</div>;
}

function Set({ index, set }) {
  const { player1, player2 } = set;

  return (
    <div>
      <div className="set__container">
        <Score score={player1} />
        <div className="set__delimiter">:</div>
        <Score score={player2} />
      </div>
    </div>
  );
}

export default Set;
