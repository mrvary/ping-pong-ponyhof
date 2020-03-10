import React, { useState } from "react";
import "./CompetitionPageHeader.css";
import { Link } from "react-router-dom";

import Popup from "./Popup";
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");

function CompetitionPage__Header({
  playmode,
  startDate,
  linkTitle,
  linkDestination,
  competitionID,
  round
}) {
  return (
    <div>
      <BackAndGameInfo
        playmode={playmode}
        startDate={startDate}
        linkTitle={linkTitle}
        linkDestination={linkDestination}
      ></BackAndGameInfo>
      <IpAdressAndStatisticLink
        competitionID={competitionID}
        round={round}
      ></IpAdressAndStatisticLink>
    </div>
  );
}

const BackAndGameInfo = ({
  playmode,
  startDate,
  linkTitle,
  linkDestination
}) => {
  return (
    <div className="competitionPage__header-alignment">
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
 * Links to IP-adress and opens statistic table
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
    <div className="competitionPage__link-alignment">
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
      <strong className="competitionPage__round">{roundDisplay}</strong>
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
