import React, { useState } from 'react';

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

  return (
    <div className="competition__container">
      <button className="competition__btn competition__btn--gameload">
        Spiel vom {date}
      </button>
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
