import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Competition.css";

// components
import Popup from "./Popup";

const COMPETITION_STATE = require("../../shared/models/competition-state");

function Competition(props) {
  const {
    competition: { id, state, name, playmode, date },
    deleteCompetition,
    hasActivGame
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
        id={id}
        name={name}
        date={date}
        state={state}
        handleShowActiveError={handleShowActiveError}
        hasActivGame={hasActivGame}
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

const PuttingThrough = ({
  id,
  name,
  state,
  date,
  handleShowActiveError,
  hasActivGame
}) => {
  const competitionID = "/competition/" + id;
  if (
    hasActivGame &&
    (state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY ||
      state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE)
  ) {
    return (
      <div
        onClick={handleShowActiveError}
        className="competition__btn competition__btn--gameload competition__link"
      >
        {name} vom {date}
      </div>
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
