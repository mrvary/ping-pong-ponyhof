import React from "react";
import "./WaitForRound.css";

import ConnectionStatus from "../../components/ConnectionStatus/ConnectionStatus";
import Title from "../../components/Title";

function WaitForRound({ appTitle, isConnected }) {
  return (
    <div>
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      <div className="ball-container">
        <div className="ball"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
}

export default WaitForRound;
