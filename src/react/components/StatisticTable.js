import React, { useState, useEffect } from "react";

import "./StatisticTable.css";
import "../Colors.css";

import CompetitionPageHeader from "./CompetitionPageHeader";

// ipc communication
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");

const TableHeader = () => {
  return (
    <div className="containerHeader">
      <div>Platz</div>
      <div>Name</div>
      <div>S:N</div>
      <div>BHZ</div>
      <div>QTTR</div>
      <div>TTR-Diff</div>
    </div>
  );
};

const TableRow = ({ ranking }) => {
  return (
    <div className="containerBody">
      <div className="ranking">{ranking.place}</div>
      <div className="topRow">
        <div> {ranking.firstname + " " + ranking.lastname} </div>
        <div> {ranking.gamesWon + " : " + ranking.gamesLost} </div>
        <div> {ranking.bhz} </div>
        <div> {ranking.qttr} </div>
        <div> {ranking.ttr_diff} </div>
      </div>

      <div className="bottomRow">
        <div> 1 </div>
        <div> 2 </div>
        <div> 3 </div>
        <div> 4 </div>
        <div> 5 </div>
        <div> 6 </div>
      </div>
    </div>
  );
};

const Table = ({ rankings }) => {
  return (
    <div>
      <TableHeader />
      {rankings.map(ranking => {
        return <TableRow key={ranking.id} ranking={ranking} />;
      })}
    </div>
  );
};

const StatisticTable = () => {
  const [competition, setCompetition] = useState({});
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    function handleRankingStatusChanged(event, { competition, rankings }) {
      console.log("ipc-main --> ipc-renderer", rankings);
      console.log(competition);
      setCompetition(competition);
      setRankings(rankings);
    }

    ipcRenderer.on(ipcMessages.UPDATE_RANKING, handleRankingStatusChanged);

    getRanking();

    return () => {
      ipcRenderer.removeListener(
        ipcMessages.UPDATE_RANKING,
        handleRankingStatusChanged
      );
    };
  }, []);

  const getRanking = () => {
    ipcRenderer.send(ipcMessages.GET_RANKING_REQUEST);
  };

  return (
    <div>
      <CompetitionPageHeader
        playmode={competition.playmode}
        startDate={competition.date}
      />
      <Table rankings={rankings} />
    </div>
  );
};

export default StatisticTable;
