import React, { useState } from "react";
import "./ConnectionStatus.css";

function ConnectionStatus({ isConnected, tableNumber, logOut }) {
  const iconCss = isConnected
    ? "connection-icon connection-icon__connected"
    : "connection-icon connection-icon__disconnected";

  const [number, setNumber] = useState(tableNumber);

  const toggleToX = () => {
    setNumber("X");
  };

  const toggleToNumber = () => {
    setNumber(tableNumber);
  };

  return (
    <div className="connection">
      <div className={iconCss}></div>
      <span
        className="connection__table-number"
        onMouseOver={toggleToX}
        onMouseOut={toggleToNumber}
        onClick={logOut}
      >
        {number}
      </span>
    </div>
  );
}

export default ConnectionStatus;
