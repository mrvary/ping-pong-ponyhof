import React, { useState, useEffect } from 'react';
import './StatisticTable.css';
import { useParams } from 'react-router-dom';
import '../Colors.css';
import CompetitionPageHeader from './CompetitionPageHeader';

// shared service
// import IPCService from "../../shared/ipc/ipcRendererService";
// const USE_BROWSER = false;

const TableHeader = () => {
  return (
    <div className="containerHeader">
      <div>Platz</div>
      <div>Name</div>
      <div>S:N</div>
      <div>BHZ</div>
      <div>TTR</div>
      <div>TTR-Beginn</div>
    </div>
  );
};

const TableRow = ({ match }) => {
  return (
    <div className="containerBody">
      <div className="ranking">{match.id + 1}</div>
      <div className="topRow">
        <div> {match.lastname} </div>
        <div> hi </div>
        <div> 3 </div>
        <div> 4 </div>
        <div> 5 </div>
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

const Table = ({ matches }) => {
  return (
    <div>
      <TableHeader />
      {matches.map(match => {
        return <TableRow key={match.id} match={match} />;
      })}
    </div>
  );
};

const StatisticTable = () => {
  //link to competitionPage
  const { competitionID } = useParams();
  const linkDestination = '/competition/' + competitionID;

  //falsche daten
  //dummy match
  const { competitionID_1 } = useParams();
  const [matches, setMatches] = useState([]);
  const [players, setPlayer] = useState([]);

  // IPCService.getMatchesByCompetition(competitionID_1, matchData => {
  //   console.log(matchData.matchesWithPlayers);
  //   setMatches(matchData.matchesWithPlayers);

  //   const playerData = IPCService.getPlayersByPlayerId();
  //   setPlayer(playerData);
  // });

  return (
    <div>
      <p>{competitionID}</p>;
      <CompetitionPageHeader
        playmode="Schweizer System"
        startDate="02.02.2020"
        linkTitle="zurück zum Dashboard"
        linkDestination={linkDestination}
      />
      <Table matches={matches} />
    </div>
  );
};

export default StatisticTable;
