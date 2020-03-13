import React from "react";

import Player from "../components/Player";
import "./NextPlayersView.css";

function NextPlayersView({ match }) {
  return (
    <div>
      <h1 className="next-players-view__title">Als nächstes spielen:</h1>
      <span></span>
      <Player player={match.player1}></Player>
      <Player player={match.player2}></Player>
    </div>
  );
}

export default NextPlayersView;
