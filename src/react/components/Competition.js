import React, { useState } from "react";

import "./Competition.css";

// components
import Popup from "./Popup";
import Button from "./Button";

function Competition(props) {
  const {
    game: { id, date },
    deleteGame
  } = props;

  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const handleClose = () => setShowPopupDelete(false);
  const handleShow = () => setShowPopupDelete(true);

  const header = <p className="popup__header-text">Achtung!</p>;
  const body = (
    <div>
      <p className="popup__body-small-text">
        Willst du dieses Spiel wirklich löschen?
      </p>
      <Button text="Löschen" onClick={() => deleteGame(id)} mode="primary"></Button>
    </div>
  );

  return (
    <div className="competition__container">
      <button className="competition__btn-game">Spiel vom {date}</button>
      <button className="competition__btn-game">Schweizer System</button>
      <button className="competition__btn-delete" onClick={handleShow}>
        Löschen
      </button>
      <Popup
        show={showPopupDelete}
        handleClose={handleClose}
        header={header}
        body={body}
      ></Popup>
    </div>
  );
}

export default Competition;
