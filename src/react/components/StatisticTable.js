/**
 * @author Sophia Dietze
 */
import React, { useState, useEffect } from "react";

import "./StatisticTable.css";
import "../Colors.css";

// components
import CompetitionPageHeader from "./CompetitionPageHeader";

//time intervall
const TOGGLE_PLAYERS_INTERVAL = 7000;

// ipc communication
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");

//Declares the column names of the table
const TableHeader = () => {
  return (
    <div className="statisticTable__table-header">
      <span>Platz</span>
      <span>Name</span>
      <span>Verein</span>
      <span>S : N</span>
      <span>BHZ</span>
      <span>QTTR</span>
      <span>QTTR-Diff</span>
    </div>
  );
};

//Declares and fills the table rows with data
const TableRow = ({ ranking }) => {
  return (
    <div className="statisticTable__seperation-color">
      <div className="statisticTable__table-body">
        <span className="statisticTable__ranking">{ranking.place}</span>
        <span className="statisticTable__name">
          {" "}
          {ranking.firstname + " " + ranking.lastname}{" "}
        </span>
        <span> {ranking.clubname}</span>
        <span> {ranking.gamesWon + " : " + ranking.gamesLost} </span>
        <span> {ranking.bhz} </span>
        <span> {ranking.qttr} </span>
        <span> {ranking.ttr_diff} </span>

        <div className="statisticTable__bottom-row">
          {ranking.matches.map(match => (
            <span>
              {match.opponentFirstname.slice(0, 1) +
                ". " +
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

//Combines table header with the table rows
const Table = ({ rankings }) => {
  return (
    <div>
      <TableHeader />
      {rankings
        .filter(ranking => ranking.visible)
        .map(ranking => {
          return <TableRow key={ranking.id} ranking={ranking} />;
        })}
    </div>
  );
};

/**
 * The Statistic Table contains the Information about the current
 * competition and rankings and is able to update it
 */
const StatisticTable = () => {
  const [competition, setCompetition] = useState({});
  const [rankings, setRankings] = useState([]);

  //set intervall to change visible and invisible
  useEffect(() => {
    const interval = setInterval(() => {
      setRankings(
        rankings.map(ranking => {
          return { ...ranking, visible: !ranking.visible };
        })
      );
    }, TOGGLE_PLAYERS_INTERVAL);
    return () => clearInterval(interval);
  }, [rankings]);

  useEffect(() => {
    function handleRankingStatusChanged(event, { competition, rankings }) {
      console.log("ipc-main --> ipc-renderer", rankings);
      console.log(competition, rankings);
      setCompetition(competition);
      //max 16 players / 2
      const initRankingsWithVisibilityToggle = rankings.map((ranking, i) => {
        return { ...ranking, visible: i < Math.floor(rankings.length / 2) };
      });
      setRankings(initRankingsWithVisibilityToggle);
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
        justFirstLine={true}
      />
      <Table rankings={rankings} />
    </div>
  );
};

export default StatisticTable;
