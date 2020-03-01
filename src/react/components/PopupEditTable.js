import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PopupEditTable.css';
import Button from './Button';

function PopupEditTable({ show, handleClose, sets, saveChanges }) {
  const [inputChanged, setInputChanged] = useState(false);
  const [currentSets, changeCurrentSet] = useState(sets);

  const endPopup = () => {
    setInputChanged(false);
    saveChanges();
    //console.log('save' + JSON.stringify(currentSets));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Edit</Modal.Header>

      <Modal.Body>
        <DisplaySetHandler
          sets={sets}
          setInputChanged={setInputChanged}
          changeCurrentSet={changeCurrentSet}
          currentSets={currentSets}
        ></DisplaySetHandler>
        <Button
          mode="primary"
          primText="Speichern"
          primOnClick={endPopup}
          disableProp={!inputChanged}
        ></Button>
      </Modal.Body>
    </Modal>
  );
}
const DisplaySetHandler = ({
  sets,
  setInputChanged,
  changeCurrentSet,
  currentSets
}) => {
  let index = 0;
  return (
    <div className="popupEditTable--columns">
      {sets.map(set => {
        index++;
        return (
          <DisplaySet
            key={index}
            set={set}
            index={index}
            changeCurrentSet={changeCurrentSet}
            setInputChanged={setInputChanged}
            currentSets={currentSets}
          ></DisplaySet>
        );
      })}
    </div>
  );
};
const DisplaySet = ({
  set,
  index,
  setInputChanged,
  changeCurrentSet,
  currentSets
}) => {
  const [player1Set, setPlayer1Set] = useState(set.player1);
  const [player2Set, setPlayer2Set] = useState(set.player2);
  let [css, setCss] = useState('');

  const checkValuesLegitimacy = (inputPlayer1, inputPlayer2) => {
    return (
      (inputPlayer1 === '11' && inputPlayer2 < 10 && inputPlayer2 >= 0) ||
      (inputPlayer2 === '11' && inputPlayer1 < 10 && inputPlayer1 >= 0) ||
      (inputPlayer1 >= 9 && inputPlayer2 - inputPlayer1 === 2) ||
      (inputPlayer2 >= 9 && inputPlayer1 - inputPlayer2 === 2)
    );
  };

  const checkInput1 = event => {
    setPlayer1Set(event.target.value);

    if (checkValuesLegitimacy(event.target.value, player2Set)) {
      setInputChanged(true);
      setCss('');
      let newSet = currentSets;
      newSet[index - 1] = {
        player1: parseInt(event.target.value),
        player2: parseInt(player2Set)
      };
      changeCurrentSet(newSet);
    } else {
      setInputChanged(false);
      setCss('popupEditTable--input');
    }
  };

  const checkInput2 = event => {
    setPlayer2Set(event.target.value);

    if (checkValuesLegitimacy(event.target.value, player1Set)) {
      setInputChanged(true);
      setCss('');
      let newSet = currentSets;
      newSet[index - 1] = {
        player1: parseInt(player1Set),
        player2: parseInt(event.target.value)
      };
      changeCurrentSet(newSet);
    } else {
      setInputChanged(false);
      setCss('popupEditTable--input');
    }
  };
  return (
    //todo stop negatives
    <div className="popupEditTable--rows">
      <p>{'Set ' + index + '  '}</p>
      <input
        className={css}
        type="number"
        size="2"
        maxLength="2"
        value={player1Set}
        onChange={checkInput1}
        name="player1Set"
      ></input>
      <p> {' : '} </p>
      <input
        className={css}
        type="number"
        size="2"
        maxLength="2"
        value={player2Set}
        onChange={checkInput2}
        name="player2Set"
      ></input>
    </div>
  );
};

export default PopupEditTable;
