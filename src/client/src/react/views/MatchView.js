/**
 * @author Felix Breitenbach
 */
import React from "react";

import ScoreBoard from "../components/ScoreBoard";

function MatchView({ match, sendSets, updateSets, addSet }) {
  return (
    <div>
      <ScoreBoard
        match={match}
        sendSets={sendSets}
        updateSets={updateSets}
        addSet={addSet}
      />
    </div>
  );
}

export default MatchView;
