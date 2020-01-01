import { Modal } from 'react-bootstrap';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


function PopupDelete ({show,handleClose,deleteGame,id,header,body}){

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            {header}
            </Modal.Header>
            <Modal.Body>
            {body}
            </Modal.Body>
        </Modal>
    )
}

export default PopupDelete;
