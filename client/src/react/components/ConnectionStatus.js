import React from "react";

function ConnectionStatus({ connected }) {
  const value = connected ? "connected" : "disconnected";
  return <div>Connection Status: {value}</div>;
}

export default ConnectionStatus;
