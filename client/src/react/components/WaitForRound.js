import React from "react";

function WaitForRound({ connected, matchStarted }) {
  if (!connected) {
    return null;
  }

  if (matchStarted) {
    return null;
  }

  return <div>Waiting for round start</div>;
}

export default WaitForRound;
