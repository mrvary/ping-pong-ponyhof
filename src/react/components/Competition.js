import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Competition.css';

// components
import Popup from './Popup';

function Competition(props) {
  const {
    game: { id, date, system },
    deleteGame
  } = props;

  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const handleClose = () => setShowPopupDelete(false);
  const handleShow = () => setShowPopupDelete(true);
  const competitionID = '/competition/' + id;
  return (
    <div className="competition__container">
      <Link
        to={competitionID}
        className="competition__btn competition__btn--gameload competition__link"
      >
        Spiel vom {date}
      </Link>
      <button className="competition__btn competition__btn--gametype">
        {system}
      </button>
      <button
        className="competition__btn competition__btn--delete"
        onClick={handleShow}
      >
        Löschen
      </button>
      <Popup
        show={showPopupDelete}
        handleClose={handleClose}
        header="Achtung!"
        bodyText="Willst du dieses Spiel wirklich löschen?"
        buttonFunk={() => deleteGame(id)}
        buttonText="Löschen"
        mode="primary"
      ></Popup>
    </div>
  );
}

export default Competition;
