import React from "react";
import "./ConnectionStatus.css";

function ConnectionStatus({ isConnected }) {
  const iconCss = isConnected
    ? "connection-icon connection-icon__connected"
    : "connection-icon connection-icon__disconnected";
  return (
    <div className="connection">
      <div className={iconCss}></div>
      Verbindung
    </div>
  );
}

export default ConnectionStatus;
