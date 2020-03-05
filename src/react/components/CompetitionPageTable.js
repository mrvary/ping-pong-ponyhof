import React, { useState } from 'react';
import './CompetitionPageTable.css';
import PopupEditTable from './PopupEditTable';
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require('../../shared/ipc-messages');
const { isMatchFinished } = require('../../client/src/shared/lib');

function CompetitionPageTable({
  matchesWithPlayers,
  active,
  gamesScore,
  nextRound
}) {
  let tableCss =
    'competitionPage__table' + (active ? '--barrierGreen' : '--barrierRed');
  let counter = 0;
  return (
    <div className="competitionPage__table--height">
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

const TableRow = ({ matchWithPlayers, active, nextRound, singleGameScore }) => {
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

  const saveChanges = (sets, tableNumber) => {
    const tableSets = { tableNumber, sets };
    ipcRenderer.send(ipcMessages.UPDATE_SETS, tableSets);
    handleCloseEditMatch();
  };

  let tischCss = 'liRed';
  if (matchWithPlayers.connectedDevice) {
    tischCss = 'liGreen';
  }
  let activeButtonCss = 'competitionPage__table__bearbeiten-btn';

  if (!active || !nextRound) {
    activeButtonCss =
      'competitionPage__table__bearbeiten-btn competitionPage__table__bearbeiten-btn--notActive';
  }
  let matchDoneCss = 'competitionPage__table competitionPage__table--values';
  if (isMatchFinished(matchWithPlayers.match)) {
    matchDoneCss =
      'competitionPage__table competitionPage__table--values competitionPage__table__matchDone';
  }
  let score;
  if (singleGameScore === undefined) {
    score = [0, 0];
  } else {
    score = singleGameScore;
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
          {score[0]}
          {' : '}
          {score[1]}{' '}
        </div>
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
