import { Modal } from 'react-bootstrap';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


function DisplayDelete ({show,handleClose,deleteGame,id}){

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            Achtung!
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Willst du dieses Spiel wirklich löschen?</p>
                    <button variant="secondary" onClick={() => deleteGame(id)}>Löschen</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
/*close button
<button variant="primary" onClick={handleClose}>Close</button>
*/
export default DisplayDelete;
