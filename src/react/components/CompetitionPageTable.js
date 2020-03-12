/**
 * @author William Kistenberger
 * @author Sophia Dietze
 */
import React, { useState } from 'react';
import './CompetitionPageTable.css';
import PopupEditTable from './PopupEditTable';

const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require('../../shared/ipc-messages');
const { isMatchFinished } = require('../../client/src/shared/lib');

/**
 * Competition Table covers the entire table of the currently played round
 */
function CompetitionPageTable({
  matchesWithPlayers,
  active,
  gamesScore,
  nextRound
}) {
  let tableCss =
    'competitionPageTable' + (active ? '--barrierGreen' : '--barrierRed');
  let counter = 0;
  return (
    <div className="competitionPageTable--height">
      <div className={tableCss}>
        <TableHeadline />
        {matchesWithPlayers.map(matchWithPlayers => {
          let singleGameScore = gamesScore[counter];
          counter++;
          return (
            <TableRow
              key={matchWithPlayers.match.id}
              matchWithPlayers={matchWithPlayers}
              active={active}
              nextRound={nextRound}
              singleGameScore={singleGameScore}
            />
          );
        })}
      </div>
    </div>
  );
}
/**
 * Declares the column names of the table
 */
const TableHeadline = () => {
  return (
    <div className="competitionPageTable--centered">
      <div className="competitionPageTable">
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Tisch
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Spieler 1
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          :
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Spieler 2
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Satz 1
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Satz 2
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Satz 3
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Satz 4
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Satz 5
        </strong>
        <strong className="competitionPageTable--elements competitionPageTable--centered">
          Ergebnis
        </strong>
      </div>
    </div>
  );
};

/**
 * creates a row for each match currently played with "bearbeiten" option
 * can call PopupEdtTable
 */
const TableRow = ({ matchWithPlayers, active, nextRound, singleGameScore }) => {
  const [showPopupEditMatch, setShowPopupEditMatch] = useState(false);
  const handleCloseEditMatch = () => setShowPopupEditMatch(false);
  const handleShowEditMatch = () => setShowPopupEditMatch(true);

  const saveChanges = (sets, tableNumber) => {
    const tableSets = { tableNumber, sets };
    ipcRenderer.send(ipcMessages.UPDATE_SETS, tableSets);
    handleCloseEditMatch();
  };

  let tischCss = 'competitionPageTable__liRed';
  if (matchWithPlayers.connectedDevice) {
    tischCss = 'competitionPageTable__liGreen';
  }
  let activeButtonCss = 'competitionPageTable__bearbeiten-btn';

  if (!active || !nextRound) {
    activeButtonCss =
      'competitionPageTable__bearbeiten-btn competitionPageTable__bearbeiten-btn--notActive';
  }
  let matchDoneCss = 'competitionPageTable competitionPageTable--values';
  if (isMatchFinished(matchWithPlayers.match)) {
    matchDoneCss =
      'competitionPageTable competitionPageTable--values competitionPageTable__matchDone';
  }

  let namePlayer1 =
    matchWithPlayers.match.player1.firstname +
    ' ' +
    matchWithPlayers.match.player1.lastname;
  let namePlayer2 =
    matchWithPlayers.match.player2.firstname +
    ' ' +
    matchWithPlayers.match.player2.lastname;
  if (matchWithPlayers.match.player1.id === 'FreeTicket') {
    namePlayer1 = matchWithPlayers.match.player1.lastname;
  }
  if (matchWithPlayers.match.player2.id === 'FreeTicket') {
    namePlayer2 = matchWithPlayers.match.player2.lastname;
  }

  let score;
  if (singleGameScore === undefined) {
    score = [0, 0];
  } else {
    score = singleGameScore;
  }
  return (
    <div className="competitionPageTable--centered">
      <div className={matchDoneCss}>
        {/**table number and connection state */}
        <div className="competitionPageTable--elements competitionPageTable--centered">
          <li id={tischCss} className="competitionPageTable--centered">
            <span>&#xa0;</span>
            <span>&#xa0;</span>
            <span>{matchWithPlayers.tableNumber}</span>
          </li>
        </div>
        {/**player names*/}
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {namePlayer1}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          :
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {namePlayer2}
        </div>
        {/**Sets 1-5*/}
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[0].player1}
          {' : '}
          {matchWithPlayers.match.sets[0].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[1].player1}
          {' : '}
          {matchWithPlayers.match.sets[1].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[2].player1}
          {' : '}
          {matchWithPlayers.match.sets[2].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[3].player1}
          {' : '}
          {matchWithPlayers.match.sets[3].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[4].player1}
          {' : '}
          {matchWithPlayers.match.sets[4].player2}
        </div>
        {/**Total score of match*/}
        <div className="competitionPageTable--elements competitionPageTable--centered competitionPageTable__score">
          {score[0]}
          {' : '}
          {score[1]}
        </div>
        {/**Edit match Button and Popup */}
        <button
          onClick={handleShowEditMatch}
          className={activeButtonCss}
          disabled={!active || matchWithPlayers.connectedDevice || !nextRound}
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

export default CompetitionPageTable;
