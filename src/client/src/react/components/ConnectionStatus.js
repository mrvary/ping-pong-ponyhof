import React from "react";
import "./ConnectionStatus.css";

function ConnectionStatus({ isConnected, tableNumber }) {
  const iconCss = isConnected
    ? "connection-icon connection-icon__connected"
    : "connection-icon connection-icon__disconnected";
  return (
    <div className="connection">
      <div className={iconCss}></div>
      <span className="connection__table-number">{tableNumber}</span>
    </div>
  );
}

export default ConnectionStatus;
