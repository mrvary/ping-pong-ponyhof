/**
 * @author William Kistenberger
 * @author Sophia Dietze
 */
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import './CompetitionPage.css';
import '../Colors.css';

// components
import Popup from './Popup';
import Button from './Button';
import CompetitionPageHeader from './CompetitionPageHeader';
import CompetitionPageTable from './CompetitionPageTable';

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

/**

 * The Competition Page contains the Information about the current
 * competition and match, with the ability to control and change it
 */
const CompetitionPage = () => {
  const { competitionID } = useParams();
  const [matchesWithPlayers, setMatchesWithPlayers] = useState([]);
  const [competitionData, setCompetitionData] = useState({});
  const [gamesScore, setGamesScore] = useState([]);

  /** Updates all states if something changes
   */
  useEffect(() => {
    function handleMatchesStatusChanged(
      event,
      { competition, matchesWithPlayers }
    ) {
      updateMatchesResults(matchesWithPlayers);
      console.log('IPC-Main-->IPC-Renderer:');
      console.log(competition, matchesWithPlayers);
      setMatchesWithPlayers(matchesWithPlayers);
      setCompetitionData(competition);
      checkForEndGame(competition);
      setNextRound(
        competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
          competition.state === COMPETITION_STATE.COMP_READY_ROUND_ACTIVE
      );
      if (
        competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
        competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
      ) {
        setActive(competition.state);
      }
      setEndGame(competition.state === COMPETITION_STATE.COMP_COMPLETED);
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

  /** checks if game is in last round and changes button if so
   */
  const checkForEndGame = competition => {
    if (competition.currentRound === 6) {
      setLastRoundDisplay(true);
    }
  };

  /** checks the current state of the current matches and calculates
   *  the current result of the each match
   *  */
  const updateMatchesResults = matchesWithPlayers => {
    let counter = 0;
    matchesWithPlayers.forEach(allMatch => {
      let newGamesScore = gamesScore;
      newGamesScore[counter] = [
        setsWonPlayer1(allMatch.match),
        setsWonPlayer2(allMatch.match)
      ];
      counter++;
      setGamesScore(newGamesScore);
    });
  };

  /** checks all matches if finished and if all are done
   *  sets matchesFinished true
   */
  const checkForFinishedRound = matchesWithPlayers => {
    let matchesFinished = true;

    matchesWithPlayers.forEach(allMatch => {
      if (!isMatchFinished(allMatch.match)) {
        matchesFinished = false;
      }
    });
    return matchesFinished;
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

  //Runde abbrechen
  const [showPopupReDoRound, setShowPopupReDoRound] = useState(false);
  const handleCloseReDoRound = () => setShowPopupReDoRound(false);
  const handleShowReDoRound = () => setShowPopupReDoRound(true);
  const reDoRound = () => {
    ipcRenderer.send(ipcMessages.CANCEL_ROUND);
    handleCloseReDoRound();
  };

  // Spiel starten
  const [showPopupEndRound, setShowPopupEndRound] = useState(false);
  const handleCloseEndRound = () => {
    setShowPopupEndRound(false);
  };
  // Nächste Runde
  const [nextRound, setNextRound] = useState(
    competitionData.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
      competitionData.state === COMPETITION_STATE.COMP_READY_ROUND_ACTIVE
  );

  const handleShowEndRound = () => {
    if (!checkForFinishedRound(matchesWithPlayers)) {
      setShowPopupEndRound(true);
    } else {
      ipcRenderer.send(ipcMessages.NEXT_ROUND);
      setNextRound(false);
    }
  };

  const handleStartRound = () => {
    ipcRenderer.send(ipcMessages.START_ROUND);
    setNextRound(true);
  };

  //Spiel zu ende
  const [endGame, setEndGame] = useState(
    competitionData.state === COMPETITION_STATE.COMP_COMPLETED
  );
  const activateEndGame = () => {
    if (!checkForFinishedRound(matchesWithPlayers)) {
      setShowPopupEndRound(true);
    } else {
      ipcRenderer.send(ipcMessages.COMPLETE_COMPETITION);
      setEndGame(true);
    }
  };

  const [lastRoundDisplay, setLastRoundDisplay] = useState(false);

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

  return (
    <div>
      <CompetitionPageHeader
        playmode={competitionData.playmode}
        startDate={competitionData.date}
        linkTitle="zur Übersicht"
        linkDestination={'/'}
        competitionID={competitionID}
        round={competitionData.currentRound}
      />
      <CompetitionPageTable
        matchesWithPlayers={matchesWithPlayers}
        active={active}
        nextRound={nextRound}
        gamesScore={gamesScore}
      />
      <div className="competitionPage__Bottom-Buttons">
        {/**Button cancel and restarts a round */}
        <Button
          primOnClick={handleShowReDoRound}
          primText="Runde abbrechen"
          mode="primary"
          disableProp={endGame || !active || competitionData.currentRound === 1}
        ></Button>
        <Popup
          show={showPopupReDoRound}
          handleClose={handleCloseReDoRound}
          header="Runde wirklich abbrechen?"
          bodyText="Alle bereits gespielten Ergebnisse der Runde gehen dabei verloren!"
          buttonFunk={() => reDoRound()}
          buttonText="Runde abbrechen"
          mode="primary"
        ></Popup>
        {/**Button activates and deactivates the competition*/}
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
        {/**Button start and ends rounds + end Competition at the end*/}
        <Button
          primOnClick={handleStartRound}
          primText="Runde starten"
          secOnClick={lastRoundDisplay ? activateEndGame : handleShowEndRound}
          secText={lastRoundDisplay ? 'Turnier beenden' : 'Nächste Runde'}
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
      </div>
    </div>
  );
};

export default CompetitionPage;
