import { Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Popup({ show, handleClose, header, body }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}

export default Popup;
