/**
 * @author Felix Breitenbach
 */
import React from "react";
import "./Player.css";

function Player({ player }) {
  return <h2>{player.firstname + " " + player.lastname}</h2>;
}

export default Player;
