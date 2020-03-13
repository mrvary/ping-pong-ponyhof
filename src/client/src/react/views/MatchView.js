import React from "react";

import ScoreBoard from "../components/ScoreBoard";

function MatchView({ match, sendSets, updateSets, addSet }) {
  return (
    <ScoreBoard
      match={match}
      sendSets={sendSets}
      updateSets={updateSets}
      addSet={addSet}
    />
  );
}

export default MatchView;
