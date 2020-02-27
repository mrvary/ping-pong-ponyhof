import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopupReviewPlayer.css";
import Button from "./Button";

const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../../shared/ipc-messages");

function PopupReviewPlayer({ show, handleClose, buttonFunk }) {
  useEffect(() => {
    getCompetition();
  }, []);

  const getCompetition = () => {
    console.log("load");
    ipcRenderer.once(
      ipcMessages.GET_SINGLE_COMPETITION_RESPONSE,
      (event, args) => {
        console.log(
          "ipc-main --> ipc-renderer",
          ipcMessages.GET_SINGLE_COMPETITION_RESPONSE
        );
        console.log(args);
      }
    );

    ipcRenderer.send(ipcMessages.GET_SINGLE_COMPETITION_REQUEST);
  };

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
