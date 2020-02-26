import { Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Button";
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
          <InsertButton
            mode={mode}
            buttonText={buttonText}
            buttonFunk={buttonFunk}
          ></InsertButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}
const InsertButton = ({ mode, buttonText, buttonFunk }) => {
  if (mode === "noBtn") {
    return null;
  }
  return <Button text={buttonText} onClick={buttonFunk}></Button>;
};

export default Popup;
