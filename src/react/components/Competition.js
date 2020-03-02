import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Competition.css";

// components
import Popup from "./Popup";

function Competition(props) {
  const {
    competition: { id, state, playmode },
    deleteCompetition
  } = props;

  const [showPopupActiveError, setShowPopupActiveError] = useState(false);
  const handleCloseActiveError = () => setShowPopupActiveError(false);
  const handleShowActiveError = () => setShowPopupActiveError(true);

  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const handleCloseDelete = () => setShowPopupDelete(false);
  const handleShowDelete = () => setShowPopupDelete(true);

  let containerCss = "competition__container";
  if (state === "comp-active-round-active") {
    containerCss = "competition__container competition__container--active";
  }

  return (
    <div className={containerCss}>
      <PuttingThrough
        props={props}
        handleShowActiveError={handleShowActiveError}
      ></PuttingThrough>
      <Popup
        show={showPopupActiveError}
        handleClose={handleCloseActiveError}
        header="Achtung!"
        bodyText="Ein anderes Spiel ist aktiv"
        mode="noBtn"
      ></Popup>

      <button className="competition__btn competition__btn--gametype">
        {playmode}
      </button>
      <button
        className="competition__btn competition__btn--delete"
        onClick={handleShowDelete}
      >
        Löschen
      </button>
      <Popup
        show={showPopupDelete}
        handleClose={handleCloseDelete}
        header="Achtung!"
        bodyText="Willst du dieses Spiel wirklich löschen?"
        buttonFunk={() => deleteCompetition(id)}
        buttonText="Löschen"
        mode="primary"
      ></Popup>
    </div>
  );
}

const PuttingThrough = (props, handleShowActiveError) => {
  const {
    competition: { id, name, state, date }
  } = props;

  const competitionID = "/competition/" + id;
  if (state === "") {
    return (
      <div
        onClick={handleShowActiveError}
        className="competition__btn competition__btn--gameload competition__link"
      ></div>
    );
  } else {
    return (
      <Link
        to={competitionID}
        className="competition__btn competition__btn--gameload competition__link"
      >
        {name} vom {date}
      </Link>
    );
  }
};

export default Competition;
