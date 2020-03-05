import React, { useState } from "react";
import "./CompetitionPageTable.css";
import PopupEditTable from "./PopupEditTable";

const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");
const { isMatchFinished } = require("../../client/src/shared/lib");

function CompetitionPageTable({
  matchesWithPlayers,
  active,
  gamesScore,
  nextRound
}) {
  let tableCss =
    "competitionPageTable" + (active ? "--barrierGreen" : "--barrierRed");
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

const TableRow = ({ matchWithPlayers, active, nextRound, singleGameScore }) => {
  const [showPopupEditMatch, setShowPopupEditMatch] = useState(false);
  const handleCloseEditMatch = () => setShowPopupEditMatch(false);
  const handleShowEditMatch = () => setShowPopupEditMatch(true);

  const saveChanges = (sets, tableNumber) => {
    const tableSets = { tableNumber, sets };
    ipcRenderer.send(ipcMessages.UPDATE_SETS, tableSets);
    handleCloseEditMatch();
  };

  let tischCss = "competitionPageTable__liRed";
  if (matchWithPlayers.connectedDevice) {
    tischCss = "competitionPageTable__liGreen";
  }
  let activeButtonCss = "competitionPageTable__bearbeiten-btn";

  if (!active || !nextRound) {
    activeButtonCss =
      "competitionPageTable__bearbeiten-btn competitionPageTable__bearbeiten-btn--notActive";
  }
  let matchDoneCss = "competitionPageTable competitionPageTable--values";
  if (isMatchFinished(matchWithPlayers.match)) {
    matchDoneCss =
      "competitionPageTable competitionPageTable--values competitionPageTable__matchDone";
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
        <div className="competitionPageTable--elements competitionPageTable--centered">
          <li id={tischCss} className="competitionPageTable--centered">
            <span>&#xa0;</span>
            <span>&#xa0;</span>
            <span>{matchWithPlayers.tableNumber}</span>
          </li>
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.player1.firstname +
            " " +
            matchWithPlayers.match.player1.lastname}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          :
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.player2.firstname +
            " " +
            matchWithPlayers.match.player2.lastname}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[0].player1}
          {" : "}
          {matchWithPlayers.match.sets[0].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[1].player1}
          {" : "}
          {matchWithPlayers.match.sets[1].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[2].player1}
          {" : "}
          {matchWithPlayers.match.sets[2].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[3].player1}
          {" : "}
          {matchWithPlayers.match.sets[3].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered">
          {matchWithPlayers.match.sets[4].player1}
          {" : "}
          {matchWithPlayers.match.sets[4].player2}
        </div>
        <div className="competitionPageTable--elements competitionPageTable--centered competitionPageTable__score">
          {score[0]}
          {" : "}
          {score[1]}
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
