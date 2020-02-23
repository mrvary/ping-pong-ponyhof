import { Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./Button";

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
      <Modal.Header closeButton className="popup__header-text">
        {header}
      </Modal.Header>

      <Modal.Body>
        <div>
          <p className="popup__body-small-text">{bodyText}</p>
          <Button text={buttonText} onClick={buttonFunk} mode={mode}></Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Popup;
