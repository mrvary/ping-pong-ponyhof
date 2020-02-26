import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CompetitionPage.css';
import '../Colors.css';

//componenten
import Popup from './Popup';
import Footer from './Footer';
import Button from './Button';
import CompetitionPageHeader from './CompetitionPageHeader';
import PopupEditTable from './PopupEditTable';

// shared service
import IPCService from '../../shared/ipc/ipcRendererService';
import { forEach } from 'react-bootstrap/cjs/ElementChildren';

const USE_BROWSER = false;

const IpAdressAndStatisticLink = ({ competitionID, openStatisticWindow }) => {
  const statisticID = '/statisticTable/' + competitionID;
  return (
    <div className="competitionPage__link-alignment">
      <div className="competitionPage__link-ip-adress-statistic">
        {' '}
        IP-Adresse{' '}
      </div>
      <p
        onClick={() => openStatisticWindow(statisticID)}
        className="competitionPage__link-ip-adress-statistic"
      >
        Statistik
      </p>
    </div>
  );
};

const TableHeadline = () => {
  return (
    <div className="competitionPage__centered">
      <div className="competitionPage__table competitionPage__table--def">
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Tisch{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Spieler 1
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          :{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Spieler 2{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Satz 1{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Satz 2{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Satz 3{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Satz 4{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Satz 5{' '}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Ergebnis{' '}
        </strong>
      </div>
    </div>
  );
};

const TableRow = ({ match }) => {
  const [stringSet, setStringSet] = useState([
    '0 : 0',
    '0 : 0',
    '0 : 0',
    '0 : 0',
    '0 : 0'
  ]);
  let index = 0;

  match.sets.forEach(set => {
    stringSet[index] = set.player1 + ' : ' + set.player2;
    index++;
  });

  const [showPopupEditMatch, setShowPopupEditMatch] = useState(false);
  const handleCloseEditMatch = () => setShowPopupEditMatch(false);
  const handleShowEditMatch = () => setShowPopupEditMatch(true);

  const saveChanges = () => {
    //TODO save Changes from edited Table
    handleCloseEditMatch();
  };

  return (
    <div className="competitionPage__centered">
      <div className="competitionPage__table competitionPage__table--values">
        <div className="competitionPage__table--elements competitionPage__centered"></div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {match.player1}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          :{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {match.player2}{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {stringSet[0]}{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {stringSet[1]}{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {stringSet[2]}{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {stringSet[3]}{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {stringSet[4]}{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          Ergebnis{' '}
        </div>
        <button
          onClick={handleShowEditMatch}
          className="competitionPage__table__bearbeiten-btn"
        >
          bearbeiten
        </button>
        <PopupEditTable
          show={showPopupEditMatch}
          handleClose={handleCloseEditMatch}
          sets={match.sets}
          saveChanges={saveChanges}
        ></PopupEditTable>
      </div>
    </div>
  );
};

const Table = ({ matches }) => {
  return (
    <div>
      <TableHeadline />
      {matches.map(match => {
        return <TableRow key={match.id} match={match} />;
      })}
    </div>
  );
};

const CompetitionPage = () => {
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

    IPCService.getMatchesByCompetition(competitionID, args => {
      const { matchesWithPlayers } = args;

      // map names to players
      const matches = matchesWithPlayers.map(matchWithPlayers => {
        const { match, player1, player2 } = matchWithPlayers;
        match.player1 = player1.firstname + ' ' + player1.lastname;
        match.player2 = player2.firstname + ' ' + player2.lastname;
        return match;
      });

      setMatches(matches);
    });
  };

  const [showPopupEndTournament, setShowPopupEndTournament] = useState(false);
  const handleCloseEndTournament = () => setShowPopupEndTournament(false);
  const handleShowEndTournament = () => setShowPopupEndTournament(true);

  const [showPopupEndRound, setShowPopupEndRound] = useState(false);
  const handleCloseEndRound = () => setShowPopupEndRound(false);
  const handleShowEndRound = () => setShowPopupEndRound(true);

  const handleEndTournament = () => {
    handleCloseEndTournament();
  };

  const handleEndRound = () => {
    handleCloseEndRound();
  };

  const handleStartRound = () => {
    IPCService.startRound();
  };

  const openStatisticWindow = route => {
    IPCService.createWindow(route);
  };

  return (
    <div>
      <p>competitionID: {competitionID}</p>
      <CompetitionPageHeader
        playmode="Scheizer System"
        startDate="02.02.2020"
        linkTitle="zur Übersicht"
        linkDestination={'/'}
      />
      <IpAdressAndStatisticLink
        competitionID={competitionID}
        openStatisticWindow={openStatisticWindow}
      />
      <Table matches={matches} />
      <div className="competitionPage__Bottom-Buttons">
        <Button
          onClick={handleShowEndTournament}
          text="Tunier abschließen"
          mode="primary"
        ></Button>
        <Popup
          show={showPopupEndTournament}
          handleClose={handleCloseEndTournament}
          header="Sicher?"
          bodyText="Möchtest du wirklich das Tunier beenden?"
          buttonFunk={() => handleEndTournament()}
          buttonText="Beenden"
          mode="primary"
        ></Popup>
        <Button
          onClick={handleShowEndRound}
          text="Runde beenden"
          mode="primary"
        ></Button>
        <Popup
          show={showPopupEndRound}
          handleClose={handleCloseEndRound}
          header="Bist du dir sicher?"
          bodyText="Möchtest du wirklich die Runde beenden?"
          buttonFunk={() => handleEndRound()}
          buttonText="Beenden"
          mode="primary"
        ></Popup>
        <Button
          onClick={handleStartRound}
          text="Runde starten"
          mode="primary"
        ></Button>
      </div>
      <Footer title="Die Tabelle" />
    </div>
  );
};

export default CompetitionPage;
