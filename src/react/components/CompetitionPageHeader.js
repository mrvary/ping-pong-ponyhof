/**
 * @author William Kistenberger
 * @author Sophia Dietze
 */
import React, { useState } from "react";
import "./CompetitionPageHeader.css";
import { Link } from "react-router-dom";

import Popup from "./Popup";
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");

/**
 * Creates the Header for the Competition View and Statistic View
 * In statistic View only first line is returned without the link
 */
function CompetitionPage__Header({
  playmode,
  startDate,
  linkTitle,
  linkDestination,
  competitionID,
  round,
  justFirstLine
}) {
  return (
    <div>
      <BackAndGameInfo
        playmode={playmode}
        startDate={startDate}
        linkTitle={linkTitle}
        linkDestination={linkDestination}
      ></BackAndGameInfo>
      {justFirstLine ? null : (
        <IpAdressAndStatisticLink
          competitionID={competitionID}
          round={round}
        ></IpAdressAndStatisticLink>
      )}
    </div>
  );
}
/**
 * Return Link back to main view and info about game
 */
const BackAndGameInfo = ({
  playmode,
  startDate,
  linkTitle,
  linkDestination
}) => {
  return (
    <div className="competitionPage__header competitionPage__alignment">
      {" "}
      <div className="competitionPage__header-logo-alignment">
        <div className="competitionPage__header-logo"></div>
        <Link className="competitionPage__link" to={linkDestination}>
          {" "}
          {linkTitle}{" "}
        </Link>
      </div>
      <div className="competitionPage__header-alignment-right">
        <div className="competitionPage__competition-playmode"> {playmode}</div>
        <div className="competitionPage__competition-startDate">
          {startDate}
        </div>
      </div>
    </div>
  );
};
/**
 * Link to IP-adress and Link opening another window with statistic view
 */
const IpAdressAndStatisticLink = ({ competitionID, round }) => {
  const [ipAddress, setIPAddress] = useState("");
  const [showPopupIP, setShowPopupIP] = useState(false);
  const handleCloseIP = () => setShowPopupIP(false);
  const handleShowIP = () => {
    ipcRenderer.once(ipcMessages.GET_IP_ADDRESS_RESPONSE, (event, args) => {
      const { ipAddress } = args;
      setIPAddress(ipAddress);
      console.log(ipAddress);
    });

    ipcRenderer.send(ipcMessages.GET_IP_ADDRESS_REQUEST);

    setShowPopupIP(true);
  };

  const openStatisticWindow = route => {
    ipcRenderer.send(ipcMessages.OPEN_NEW_WINDOW, { route: route });
  };

  const statisticID = "/statisticTable/" + competitionID;
  let roundDisplay = "Runde: " + round;
  return (
    <div className="competitionPage__alignment">
      <div
        className="competitionPage__link-ip-adress-statistic"
        onClick={handleShowIP}
      >
        {" "}
        IP-Adresse{" "}
      </div>
      <Popup
        show={showPopupIP}
        handleClose={handleCloseIP}
        header="Verbinde mit"
        bodyText={ipAddress}
        mode="noBtn"
      ></Popup>
      <p className="competitionPage__round">{roundDisplay}</p>
      <p
        onClick={() => openStatisticWindow(statisticID)}
        className="competitionPage__link-ip-adress-statistic"
      >
        Statistik
      </p>
    </div>
  );
};

export default CompetitionPage__Header;
