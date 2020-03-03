import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CompetitionPage.css';
import '../Colors.css';

// components
import Popup from './Popup';
import Button from './Button';
import CompetitionPageHeader from './CompetitionPageHeader';
import PopupEditTable from './PopupEditTable';

// ipc communication
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require('../../shared/ipc-messages');
const COMPETITION_STATE = require('../../shared/models/competition-state');
const {
  isMatchFinished,
  setsWonPlayer1,
  setsWonPlayer2
} = require('../../client/src/shared/lib');
const USE_BROWSER = false;

const IpAdressAndStatisticLink = ({ competitionID, openStatisticWindow }) => {
  const [showPopupIP, setShowPopupIP] = useState(false);
  const handleCloseIP = () => setShowPopupIP(false);
  const handleShowIP = () => setShowPopupIP(true);

  const statisticID = '/statisticTable/' + competitionID;
  return (
    <div className="competitionPage__link-alignment">
      <div
        className="competitionPage__link-ip-adress-statistic"
        onClick={handleShowIP}
      >
        {' '}
        IP-Adresse{' '}
      </div>
      <Popup
        show={showPopupIP}
        handleClose={handleCloseIP}
        header="Verbinde mit"
        bodyText="IP"
        mode="noBtn"
      ></Popup>
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

const TableRow = ({ matchWithPlayers, active }) => {
  const [stringSet, setStringSet] = useState([
    '0 : 0',
    '0 : 0',
    '0 : 0',
    '0 : 0',
    '0 : 0'
  ]);
  let index = 0;

  matchWithPlayers.match.sets.forEach(set => {
    stringSet[index] = set.player1 + ' : ' + set.player2;
    index++;
  });

  const [showPopupEditMatch, setShowPopupEditMatch] = useState(false);
  const handleCloseEditMatch = () => setShowPopupEditMatch(false);
  const handleShowEditMatch = () => setShowPopupEditMatch(true);

  const [gameScore, setGameScore] = useState([0, 0]);

  const saveChanges = (sets, tableNumber) => {
    const tableSets = { tableNumber, sets };
    ipcRenderer.send(ipcMessages.UPDATE_SETS, tableSets);
    setGameScore([
      setsWonPlayer1(matchWithPlayers.match),
      setsWonPlayer2(matchWithPlayers.match)
    ]);
    handleCloseEditMatch();
  };

  let tischCss = 'liRed';
  if (matchWithPlayers.connectedDevice) {
    tischCss = 'liGreen';
  }
  let activeButtonCss = 'competitionPage__table__bearbeiten-btn';
  if (!active) {
    activeButtonCss =
      'competitionPage__table__bearbeiten-btn competitionPage__table__bearbeiten-btn--notActive';
  }
  let matchDoneCss = 'competitionPage__table competitionPage__table--values';
  if (isMatchFinished(matchWithPlayers.match)) {
    matchDoneCss =
      'competitionPage__table competitionPage__table--values competitionPage__table__matchDone';
  }

  return (
    <div className="competitionPage__centered">
      <div className={matchDoneCss}>
        <div className="competitionPage__table--elements competitionPage__centered">
          <li id={tischCss} className="competitionPage__centered">
            <span>&#xa0;</span>
            <span>&#xa0;</span>
            <span>{matchWithPlayers.tableNumber}</span>
          </li>
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {matchWithPlayers.match.player1.firstname +
            ' ' +
            matchWithPlayers.match.player1.lastname}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          :{' '}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {' '}
          {matchWithPlayers.match.player2.firstname +
            ' ' +
            matchWithPlayers.match.player2.lastname}{' '}
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
        <div className="competitionPage__table--elements competitionPage__centered competitionPage__table__score">
          {' '}
          {gameScore[0]}
          {' : '}
          {gameScore[1]}{' '}
        </div>
        <button
          onClick={handleShowEditMatch}
          className={activeButtonCss}
          disabled={!active || matchWithPlayers.connectedDevice}
        >
          bearbeiten
        </button>
        <PopupEditTable
          show={showPopupEditMatch}
          handleClose={handleCloseEditMatch}
          sets={matchWithPlayers.match.sets}
          saveChanges={saveChanges}
          tableNumber={matchWithPlayers.tableNumber}
        ></PopupEditTable>
      </div>
    </div>
  );
};

const Table = ({ matchesWithPlayers, active }) => {
  let tableCss =
    'competitionPage__table' + (active ? '--barrierGreen' : '--barrierRed');
  return (
    <div className={tableCss}>
      <TableHeadline />
      {matchesWithPlayers.map(matchWithPlayers => {
        return (
          <TableRow
            key={matchWithPlayers.match.id}
            matchWithPlayers={matchWithPlayers}
            active={active}
          />
        );
      })}
    </div>
  );
};

const CompetitionPage = () => {
  const { competitionID } = useParams();
  const [matchesWithPlayers, setMatchesWithPlayers] = useState([]);
  const [competitionData, setCompetitionData] = useState({});
  const [matchesFinished, setMatchesFinished] = useState(false);

  useEffect(() => {
    function handleMatchesStatusChanged(
      event,
      { competition, matchesWithPlayers }
    ) {
      console.log('IPC-Main-->IPC-Renderer:');
      console.log(competition, matchesWithPlayers);
      setMatchesWithPlayers(matchesWithPlayers);
      setCompetitionData(competition);
      checkForFinishedRound(matchesWithPlayers);
      if (
        competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
        competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
      ) {
        setActive(competition.state);
      }
    }

    ipcRenderer.on(ipcMessages.UPDATE_MATCHES, handleMatchesStatusChanged);
    updateCompetition();

    return () => {
      ipcRenderer.removeListener(
        ipcMessages.UPDATE_MATCHES,
        handleMatchesStatusChanged
      );
    };
  }, []);

  const checkForFinishedRound = matchesWithPlayers => {
    let matchesFinished = true;
    matchesWithPlayers.forEach(allMatch => {
      if (!isMatchFinished(allMatch.match)) {
        matchesFinished = false;
      }
    });
    setMatchesFinished(matchesFinished);
  };

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
      setMatchesWithPlayers(matches);
      return;
    }

    // trigger initialize competition
    ipcRenderer.send(ipcMessages.GET_COMPETITION_MATCHES_REQUEST, {
      competitionId: competitionID
    });
  };

  //Spiel zu ende
  const [endGame, setEndGame] = useState(false); //ist am anfang vllt true
  const [nextRound, setNextRound] = useState(false);

  //Turnier beenden
  //TODO: a Reaction

  //Runde abbrechen
  const [showPopupReDoRound, setShowPopupReDoRound] = useState(false);
  const handleCloseReDoRound = () => setShowPopupReDoRound(false);
  const handleShowReDoRound = () => setShowPopupReDoRound(true);
  //nicht in erste runde
  // runde abbrechen aufgerufen
  // immernoch nächste runde
  const reDoRound = () => {
    handleCloseReDoRound();
    //TODO: call dabase for last round
  };

  //Spiel starten / nächste Runde

  const [showPopupEndRound, setShowPopupEndRound] = useState(false);
  const handleCloseEndRound = () => setShowPopupEndRound(false);

  const handleShowEndRound = () => {
    if (!matchesFinished) {
      setShowPopupEndRound(true);
    } else {
      setNextRound(false);
      //TODO: next Round
      //schicken ist finished
      //MATCHMAKER  magic
      //-> alles auf null
    }
  };
  const handleStartRound = () => {
    ipcRenderer.send(ipcMessages.START_ROUND);
    setNextRound(true);
  };

  //Turnier aktivieren / deactivieren

  const [active, setActive] = useState(false);
  const handleActivate = () => {
    ipcRenderer.send(ipcMessages.START_COMPETITION);
    setActive(true);
  };
  const handleDisactivate = () => {
    ipcRenderer.send(ipcMessages.CANCEL_COMPETITION);
    setActive(false);
    handleCloseGoInactive();
  };
  const [showPopupGoInactive, setShowPopupGoInactive] = useState(false);
  const handleCloseGoInactive = () => setShowPopupGoInactive(false);
  const handleShowGoInactive = () => setShowPopupGoInactive(true);

  const openStatisticWindow = route => {
    ipcRenderer.send(ipcMessages.OPEN_NEW_WINDOW, { route: route });
  };

  //am anfang runde starten
  return (
    <div>
      <CompetitionPageHeader
        playmode={competitionData.playmode}
        startDate={competitionData.date}
        linkTitle="zur Übersicht"
        linkDestination={'/'}
      />
      <IpAdressAndStatisticLink
        competitionID={competitionID}
        openStatisticWindow={openStatisticWindow}
      />
      <Table matchesWithPlayers={matchesWithPlayers} active={active} />
      <div className="competitionPage__Bottom-Buttons">
        <Button
          primOnClick={handleShowReDoRound}
          primText="Runde abbrechen"
          mode="primary"
          disableProp={endGame || !active}
        ></Button>
        <Popup
          show={showPopupReDoRound}
          handleClose={handleCloseReDoRound}
          header="Möchtest du die aktuelle Runde abbrechen?"
          bodyText="Alle bereits gespielten Ergebnisse der Runde gehen dabei verloren!"
          buttonFunk={() => reDoRound()}
          buttonText="Runde abbrechen"
          mode="primary"
        ></Popup>

        <Button
          primOnClick={handleStartRound}
          primText="Runde starten"
          secOnClick={handleShowEndRound}
          secText="Nächste Runde"
          mode={nextRound ? 'secondary' : 'primary'}
          disableProp={endGame || !active}
        ></Button>
        <Popup
          show={showPopupEndRound}
          handleClose={handleCloseEndRound}
          header="Achtung!"
          bodyText="Die Runde kann nur beendet werden, wenn alle Matches fertig gespielt sind"
          mode="noBtn"
        ></Popup>

        <Button
          primOnClick={handleActivate}
          primText="Turnier starten"
          secOnClick={handleShowGoInactive}
          secText="Turnier pausieren"
          mode={active ? 'secondary' : 'primary'}
          disableProp={endGame}
        ></Button>
        <Popup
          show={showPopupGoInactive}
          handleClose={handleCloseGoInactive}
          header="Bist du dir sicher?"
          bodyText="Verbindungen zu Nutzergeräten werden beim Pausieren unterbrochen"
          buttonFunk={() => handleDisactivate()}
          buttonText="pausieren"
          mode="primary"
        ></Popup>
      </div>
    </div>
  );
};

export default CompetitionPage;
