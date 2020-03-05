import { Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./Button";
import "./Popup.css";

function Popup({
  show,
  handleClose,
  header,
  bodyText,
  buttonFunk,
  buttonText,
  mode
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="popup__header--text">
        <div className="popup__header--center">
          <p>{header}</p>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div>
          <p className="popup__body--small-text">{bodyText}</p>
          <div className="popup__body--button">
            <InsertButton
              mode={mode}
              buttonText={buttonText}
              buttonFunk={buttonFunk}
            ></InsertButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
const InsertButton = ({ mode, buttonText, buttonFunk }) => {
  if (mode === "noBtn") {
    return null;
  }
  return (
    <Button primText={buttonText} primOnClick={buttonFunk} mode={mode}></Button>
  );
};

export default Popup;
