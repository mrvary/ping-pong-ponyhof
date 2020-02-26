import { Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopupReviewPlayer.css";
import Button from "./Button";

function PopupReviewPlayer({ show, handleClose, buttonFunk }) {
  return (
    <Modal show={show} onHide={() => handleClose(true)}>
      <Modal.Header closeButton className="popup__header-text">
        Turnier anlegen
      </Modal.Header>

      <Modal.Body>
        <div className="popup__centered">
          <p className="popup__body-small-text">
            Folgende Spieler sind im Spiel:
          </p>
          <div>
            <p className="popup__names">player1</p>
            <p className="popup__names">player1</p>
            <p className="popup__names">player1</p>
            <p className="popup__names">player1</p>
            <p className="popup__names">player1</p>
          </div>
          <Button text="Hochladen" onClick={buttonFunk}></Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopupReviewPlayer;
