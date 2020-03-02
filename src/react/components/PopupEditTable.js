import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopupEditTable.css";
import Button from "./Button";

function PopupEditTable({ show, handleClose, sets, saveChanges, tableNumber }) {
  const [inputChanged, setInputChanged] = useState(false);
  const [currentSets, changeCurrentSet] = useState(sets);

  const endPopup = () => {
    setInputChanged(false);
    saveChanges(currentSets, tableNumber);
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
  const checkValuesLegitimacy = (inputPlayer1, inputPlayer2) => {
    return (
      (inputPlayer1 === 11 && inputPlayer2 < 10 && inputPlayer2 >= 0) ||
      (inputPlayer2 === 11 && inputPlayer1 < 10 && inputPlayer1 >= 0) ||
      (inputPlayer1 >= 9 && inputPlayer2 - inputPlayer1 === 2) ||
      (inputPlayer2 >= 9 && inputPlayer1 - inputPlayer2 === 2)
    );
  };
  const toSecondMode = (inputPlayer1, inputPlayer2) => {
    if (inputPlayer1 > inputPlayer2) {
      return inputPlayer2;
    } else {
      return -inputPlayer1;
    }
  };
  const toFirstMode = differenz => {
    if (differenz > 0) {
      if (differenz > 9) {
        return [differenz + 2, differenz];
      } else {
        return [11, differenz];
      }
    } else {
      if (-differenz > 9) {
        return [-differenz, -differenz + 2];
      } else {
        return [-differenz, 11];
      }
    }
  };

  const [player1Set, setPlayer1Set] = useState(set.player1);
  const [player2Set, setPlayer2Set] = useState(set.player2);
  const [differenz, setDifferenz] = useState(
    toSecondMode(parseInt(set.player1), parseInt(set.player2))
  );
  let [css, setCss] = useState("");

  const checkInput1 = event => {
    setPlayer1Set(event.target.value);

    if (
      checkValuesLegitimacy(parseInt(event.target.value), parseInt(player2Set))
    ) {
      setDifferenz(
        toSecondMode(parseInt(event.target.value), parseInt(player2Set))
      );
      setInputChanged(true);
      setCss("");
      let newSet = currentSets;
      newSet[index - 1] = {
        player1: parseInt(event.target.value),
        player2: parseInt(player2Set)
      };
      changeCurrentSet(newSet);
    } else {
      setInputChanged(false);
      setDifferenz(0);
      setCss("popupEditTable--input");
    }
  };

  const checkInput2 = event => {
    setPlayer2Set(event.target.value);

    if (
      checkValuesLegitimacy(parseInt(player1Set), parseInt(event.target.value))
    ) {
      setDifferenz(
        toSecondMode(parseInt(player1Set), parseInt(event.target.value))
      );
      setInputChanged(true);
      setCss("");
      let newSet = currentSets;
      newSet[index - 1] = {
        player1: parseInt(player1Set),
        player2: parseInt(event.target.value)
      };
      changeCurrentSet(newSet);
    } else {
      setInputChanged(false);
      setDifferenz(0);
      setCss("popupEditTable--input");
    }
  };

  const checkInput3 = event => {
    const [player1, player2] = toFirstMode(parseInt(event.target.value));
    setPlayer1Set(player1);
    setPlayer2Set(player2);
    setDifferenz(event.target.value);

    console.log(
      "ergebnis" +
        player1 +
        "+" +
        player2 +
        "=" +
        checkValuesLegitimacy(parseInt(player1), parseInt(player2))
    );

    if (checkValuesLegitimacy(player1, player2)) {
      setInputChanged(true);
      setCss("");
      let newSet = currentSets;
      newSet[index - 1] = {
        player1: parseInt(player1),
        player2: parseInt(player2)
      };
      changeCurrentSet(newSet);
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };
  return (
    //todo stop negatives
    <div className="popupEditTable--rows">
      <div>{"Set " + index + "  "}</div>
      <input
        className={css}
        type="number"
        size="2"
        maxLength="2"
        value={player1Set}
        onChange={checkInput1}
        name="player1Set"
      ></input>
      <div> {" : "} </div>
      <input
        className={css}
        type="number"
        size="2"
        maxLength="2"
        value={player2Set}
        onChange={checkInput2}
        name="player2Set"
      ></input>
      <div>|</div>
      <div>Kurzerfassung:</div>
      <input
        className={css}
        type="number"
        size="2"
        maxLength="2"
        value={differenz}
        onChange={checkInput3}
        name="Kurzerfassung"
      ></input>
    </div>
  );
};

export default PopupEditTable;
