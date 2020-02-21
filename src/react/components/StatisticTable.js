import React, { useState, useEffect } from 'react';
import './StatisticTable.css';
import { useParams } from 'react-router-dom';
import '../Colors.css';
import CompetitionPageHeader from './CompetitionPageHeader';

const TableHeader = () => {
  return <div className="containerHeader"></div>;
};

const Table = () => {
  return (
    <div className="containerBody">
      <div className="ranking">1</div>
      <div className="topRow">
        <div> 1 </div>
        <div> 2 </div>
        <div> 3 </div>
        <div> 4 </div>
        <div> 5 </div>
        <div> 6 </div>
        <div> 7 </div>
      </div>

      <div className="bottomRow">
        <div> 1 </div>
        <div> 2 </div>
        <div> 3 </div>
        <div> 4 </div>
        <div> 5 </div>
        <div> 6 </div>
        <div> 7 </div>
      </div>
    </div>
  );
};

const StatisticTable = () => {
  //link to competitionPage
  const { competitionID } = useParams();
  const linkDestination = '/competition/' + competitionID;

    //dummy match
    const { competitionID } = useParams();
    const [matches, setMatches] = useState([]);
    const [players, setPlayer] = useState([]);
  
    useEffect(() => {
      updateCompetition();
    }, []);
  
    const updateCompetition = () => {
      if (USE_BROWSER) {
        const matches = [
          {
            id: 3,
            player1: 'Samuel Geiger',
            player2: 'Marius Bach',
            sets: [
              { player1: 11, player2: 13 },
              { player1: 4, player2: 11 }
            ],
            freeTicket: false,
            compId: 1
          },
          {
            id: 4,
            player1: 'Edith Finch',
            player2: 'Finch Assozial',
            sets: [
              { player1: 13, player2: 15 },
              { player1: 14, player2: 16 }
            ],
            freeTicket: false,
            compId: 1
          }
        ];
  
        console.log(matches);
        setMatches(matches);
        return;
      }
  
      IPCService.getMatchesByCompetition(competitionID, matchData => {
        console.log(matchData);
        setMatches(matchData);
  
        const playerData = IPCService.getPlayersByPlayerId();
        setPlayer(playerData);
      });
    };

  return (
    <div>
      <p>{competitionID}</p>;
      <CompetitionPageHeader
        playmode="Schweizer System"
        startDate="02.02.2020"
        linkTitle="zurück zum Dashboard"
        linkDestination={linkDestination}
      />
      <TableHeader />
      <Table ranking="1" />
    </div>
  );
};

export default StatisticTable;
