import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CompetitionPage.css";
import "../Colors.css";

// components
import Popup from "./Popup";
import Footer from "./Footer";
import Button from "./Button";
import CompetitionPageHeader from "./CompetitionPageHeader";
import PopupEditTable from "./PopupEditTable";

// ipc communication
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");

const USE_BROWSER = false;

const IpAdressAndStatisticLink = ({ competitionID, openStatisticWindow }) => {
  const statisticID = "/statisticTable/" + competitionID;
  return (
    <div className="competitionPage__link-alignment">
      <div className="competitionPage__link-ip-adress-statistic">
        {" "}
        IP-Adresse{" "}
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
          {" "}
          Tisch{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Spieler 1
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          :{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Spieler 2{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Satz 1{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Satz 2{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Satz 3{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Satz 4{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Satz 5{" "}
        </strong>
        <strong className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Ergebnis{" "}
        </strong>
      </div>
    </div>
  );
};

const TableRow = ({ matchWithPlayers, active }) => {
  const [stringSet, setStringSet] = useState([
    "0 : 0",
    "0 : 0",
    "0 : 0",
    "0 : 0",
    "0 : 0"
  ]);
  let index = 0;

  //console.log('stringyfy' + JSON.stringify(matchWithPlayers.match));
  matchWithPlayers.match.sets.forEach(set => {
    stringSet[index] = set.player1 + " : " + set.player2;
    index++;
  });

  const [showPopupEditMatch, setShowPopupEditMatch] = useState(false);
  const handleCloseEditMatch = () => setShowPopupEditMatch(false);
  const handleShowEditMatch = () => setShowPopupEditMatch(true);

  const saveChanges = (sets, tableNumber) => {
    //TODO save Changes from edited Table
    console.log("tablenr" + tableNumber);
    const tableSets = { tableNumber, sets };
    ipcRenderer.send(ipcMessages.UPDATE_SETS, tableSets);
    handleCloseEditMatch();
  };

  let tischCss = "liRed";
  if (matchWithPlayers.connectedDevice) {
    tischCss = "liGreen";
  }
  let activeButtonCss = "competitionPage__table__bearbeiten-btn";
  if (!active) {
    activeButtonCss =
      "competitionPage__table__bearbeiten-btn competitionPage__table__bearbeiten-btn--notActive";
  }

  return (
    <div className="competitionPage__centered">
      <div className="competitionPage__table competitionPage__table--values">
        <div className="competitionPage__table--elements competitionPage__centered">
          <li id={tischCss} className="competitionPage__centered">
            <span>&#xa0;</span>
            <span>&#xa0;</span>
            <span>{matchWithPlayers.tableNumber}</span>
          </li>
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          {matchWithPlayers.match.player1.firstname +
            " " +
            matchWithPlayers.match.player1.lastname}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          :{" "}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          {matchWithPlayers.match.player2.firstname +
            " " +
            matchWithPlayers.match.player2.lastname}{" "}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          {stringSet[0]}{" "}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          {stringSet[1]}{" "}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          {stringSet[2]}{" "}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          {stringSet[3]}{" "}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          {stringSet[4]}{" "}
        </div>
        <div className="competitionPage__table--elements competitionPage__centered">
          {" "}
          Ergebnis{" "}
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
    "competitionPage__table" + (active ? "--barrierGreen" : "--barrierRed");
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
  useEffect(() => {
    function handleMatchesStatusChanged(
      event,
      { competition, matchesWithPlayers }
    ) {
      console.log("IPC-Main-->IPC-Renderer:", matchesWithPlayers);
      setMatchesWithPlayers(matchesWithPlayers);
      setCompetitionData(competition);
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

  const updateCompetition = () => {
    if (USE_BROWSER) {
      const matches = [
        {
          id: 3,
          player1: "Samuel Geiger",
          player2: "Marius Bach",
          sets: [
            { player1: 11, player2: 13 },
            { player1: 4, player2: 11 }
          ],
          freeTicket: false,
          compId: 1
        },
        {
          id: 4,
          player1: "Edith Finch",
          player2: "Finch Assozial",
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
  const [active, setActive] = useState(false);
  const handleActivate = () => {
    setActive(true);
  };
  const handleDisactivate = () => {
    setActive(false);
    handleCloseGoInactive();
  };

  const [showPopupReDoRound, setShowPopupReDoRound] = useState(false);
  const handleCloseReDoRound = () => setShowPopupReDoRound(false);
  const handleShowReDoRound = () => setShowPopupReDoRound(true);

  const [showPopupEndRound, setShowPopupEndRound] = useState(false);
  const handleCloseEndRound = () => setShowPopupEndRound(false);
  const handleShowEndRound = () => setShowPopupEndRound(true);

  const [showPopupGoInactive, setShowPopupGoInactive] = useState(false);
  const handleCloseGoInactive = () => setShowPopupGoInactive(false);
  const handleShowGoInactive = () => setShowPopupGoInactive(true);

  const handleEndTournament = () => {
    handleCloseReDoRound();
  };

  const handleEndRound = () => {
    handleCloseEndRound();
  };

  const handleStartRound = () => {
    ipcRenderer.send(ipcMessages.START_ROUND);
  };

  const openStatisticWindow = route => {
    ipcRenderer.send(ipcMessages.OPEN_NEW_WINDOW, { route: route });
  };

  return (
    <div>
      <p>competitionID: {competitionID}</p>
      <CompetitionPageHeader
        playmode={competitionData.playmode}
        startDate={competitionData.date}
        linkTitle="zur Übersicht"
        linkDestination={"/"}
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
          disableProp={!active}
        ></Button>
        <Popup
          show={showPopupReDoRound}
          handleClose={handleCloseReDoRound}
          header="Sicher?"
          bodyText="Bisher erreichte Ergebnisse der Runde werden gelöscht und eine neue Runde wird geloßt"
          buttonFunk={() => handleEndTournament()}
          buttonText="Runde abbrechen"
          mode="primary"
        ></Popup>

        <Button
          primOnClick={handleShowEndRound}
          primText="Runde beenden"
          secOnClick={handleStartRound}
          secText="Runde starten"
          mode="primary"
          disableProp={!active}
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
          primOnClick={handleActivate}
          primText="Spiel starten"
          secOnClick={handleShowGoInactive}
          secText="Spiel pausieren"
          mode={active ? "secondary" : "primary"}
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
      <Footer title="Die Tabelle" />
    </div>
  );
};

export default CompetitionPage;
