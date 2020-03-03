import { Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopupReviewPlayer.css";
import Button from "./Button";

function PopupReviewPlayer({
  show,
  handleClose,
  buttonFunk,
  viewedPlayers,
  viewedCompetition
}) {
  return (
    <Modal show={show} onHide={() => handleClose(true)}>
      <Modal.Header closeButton className="popup__header-text">
        Turnier anlegen
      </Modal.Header>

      <Modal.Body>
        <div className="popup__centered">
          <strong className="popup__body-small-text">
            {viewedCompetition.name}
          </strong>
          <p className="popup__body-smaller-text">{viewedCompetition.date}</p>
          <p className="popup__body-smaller-text popup__extra-margin">
            {viewedCompetition.playmode}
          </p>
          <p className="popup__body-small-text">
            Folgende Spieler sind im Turnier:
          </p>
          <div className="popup__player-List">
            {viewedPlayers.map(player => (
              <li key={player.id} className="popup__names">
                {player.firstname + " " + player.lastname}
              </li>
            ))}
          </div>
          <Button
            primText="Hochladen"
            primOnClick={buttonFunk}
            mode="primary"
          ></Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopupReviewPlayer;
