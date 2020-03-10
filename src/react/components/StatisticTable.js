import React, { useState, useEffect } from "react";

import "./StatisticTable.css";
import "../Colors.css";

import CompetitionPageHeader from "./CompetitionPageHeader";

// ipc communication
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");

const TableHeader = () => {
  return (
    <div className="statisticTable__table-header">
      <span>Platz</span>
      <span>Name</span>
      <span>S : N</span>
      <span>BHZ</span>
      <span>QTTR</span>
      <span>QTTR-Diff</span>
    </div>
  );
};

const TableRow = ({ ranking }) => {
  return (
    <div className="statisticTable__seperation-color">
      <div className="statisticTable__table-body">
        <span className="statisticTable__ranking">{ranking.place}</span>
        <span className="statisticTable__name">
          {" "}
          {ranking.firstname + " " + ranking.lastname}{" "}
        </span>
        <span> {ranking.gamesWon + " : " + ranking.gamesLost} </span>
        <span> {ranking.bhz} </span>
        <span> {ranking.qttr} </span>
        <span> {ranking.ttr_diff} </span>

        <div className="statisticTable__bottom-row">
          {ranking.matches.map(match => (
            <span>
              {match.opponentFirstname +
                " " +
                match.opponentLastname +
                " " +
                match.ownSets +
                " : " +
                match.opponentSets}
            </span>
          ))}
        </div>
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
      console.log(competition, rankings);
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
