import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PopupEditTable.css';
import Button from './Button';

function PopupEditTable({ show, handleClose, sets, saveChanges }) {
  const [inputChanged, setInputChanged] = useState(false);
  const handleInputChanged = () => {
    setInputChanged(true);
  };
  const endPopup = () => {
    setInputChanged(false);
    saveChanges();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Edit</Modal.Header>

      <Modal.Body>
        <DisplaySetHandler
          sets={sets}
          handleInputChanged={handleInputChanged}
        ></DisplaySetHandler>
        <Button
          text="Speichern"
          mode="primary"
          onClick={endPopup}
          disableProp={!inputChanged}
        ></Button>
      </Modal.Body>
    </Modal>
  );
}
const DisplaySetHandler = ({ sets, handleInputChanged }) => {
  let index = 0;
  return (
    <div className="popupEditTable--columns">
      {sets.map(set => {
        index++;
        return (
          <DisplaySet
            set={set}
            index={index}
            handleInputChanged={handleInputChanged}
          ></DisplaySet>
        );
      })}
    </div>
  );
};
const DisplaySet = ({ set, index, handleInputChanged }) => {
  return (
    <div className="popupEditTable--rows">
      <p>{'Set ' + index + '  '}</p>
      <input
        size="2"
        maxLength="2"
        defaultValue={set.player1}
        def
        onChange={handleInputChanged}
      ></input>
      <p> {' : '} </p>
      <input
        size="2"
        maxLength="2"
        defaultValue={set.player2}
        onChange={handleInputChanged}
      ></input>
    </div>
  );
};

export default PopupEditTable;
