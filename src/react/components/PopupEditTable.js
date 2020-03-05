import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopupEditTable.css";
import Button from "./Button";

function PopupEditTable({ show, handleClose, sets, saveChanges, tableNumber }) {
  const [inputChanged, setInputChanged] = useState(false);
  const [currentSets, changeCurrentSets] = useState([...sets]);

  const endPopup = () => {
    setInputChanged(false);
    saveChanges(currentSets, tableNumber);
  };
  const onHide = () => {
    handleClose();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className="popup__header--text">
        <div className="popup__header--center">
          <p>Bearbeiten</p>
        </div>
      </Modal.Header>

      <Modal.Body>
        <DisplaySetHandler
          setInputChanged={setInputChanged}
          changeCurrentSets={changeCurrentSets}
          currentSets={currentSets}
        ></DisplaySetHandler>
        <div className="popupEditTable__body--button">
          <Button
            mode="primary"
            primText="Speichern"
            primOnClick={endPopup}
            disableProp={!inputChanged}
          ></Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const DisplaySetHandler = ({
  setInputChanged,
  changeCurrentSets,
  currentSets
}) => {
  let index = 0;
  return (
    <div className="popupEditTable--columns">
      {currentSets.map(set => {
        index++;
        return (
          <DisplaySet
            key={index}
            set={set}
            index={index}
            changeCurrentSets={changeCurrentSets}
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
  changeCurrentSets,
  currentSets
}) => {
  //only checks if values create a valid set
  const checkValuesLegitimacy = (inputPlayer1, inputPlayer2) => {
    return (
      (inputPlayer1 === 11 && inputPlayer2 < 10 && inputPlayer2 >= 0) ||
      (inputPlayer2 === 11 && inputPlayer1 < 10 && inputPlayer1 >= 0) ||
      (inputPlayer1 >= 9 && inputPlayer2 - inputPlayer1 === 2) ||
      (inputPlayer2 >= 9 && inputPlayer1 - inputPlayer2 === 2) ||
      (inputPlayer1 === 0 && inputPlayer2 === 0)
    );
  };

  //only checks if values create a valid match
  const checkLegitTotalInput = (inputPlayer1, inputPlayer2) => {
    let newSets = currentSets;
    newSets[index - 1] = {
      player1: parseInt(inputPlayer1),
      player2: parseInt(inputPlayer2)
    };
    let winsPlayer1 = 0;
    let winsPlayer2 = 0;
    let zerostate = false;
    let legitInput = true;

    newSets.forEach(set => {
      if (parseInt(set.player1) === 0 && parseInt(set.player2) === 0) {
        zerostate = true;
      } else {
        if (winsPlayer1 === 3 || winsPlayer2 === 3) {
          legitInput = false;
        }
        if (parseInt(set.player1) > parseInt(set.player2)) {
          winsPlayer1++;
        } else if (parseInt(set.player2) > parseInt(set.player1)) {
          winsPlayer2++;
        }

        if (zerostate) {
          legitInput = false;
        }
      }
    });

    if (winsPlayer1 > 3 || winsPlayer2 > 3) {
      legitInput = false;
    }
    return legitInput;
  };

  //converts traditional input to quick input
  const toSecondMode = (inputPlayer1, inputPlayer2) => {
    if (inputPlayer1 > inputPlayer2) {
      return inputPlayer2;
    } else {
      return -inputPlayer1;
    }
  };

  //converts quick input to traditional input
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

  //check if input of first input window is allowed and reacts
  const checkInput1 = event => {
    setPlayer1Set(event.target.value);

    if (
      checkValuesLegitimacy(
        parseInt(event.target.value),
        parseInt(player2Set)
      ) &&
      checkLegitTotalInput(parseInt(event.target.value), parseInt(player2Set))
    ) {
      setDifferenz(
        toSecondMode(parseInt(event.target.value), parseInt(player2Set))
      );
      setInputChanged(true);
      setCss("");
      let newSets = currentSets;
      newSets[index - 1] = {
        player1: parseInt(event.target.value),
        player2: parseInt(player2Set)
      };
      changeCurrentSets(newSets);
    } else {
      setInputChanged(false);
      setDifferenz(0);
      setCss("popupEditTable--input");
    }
  };

  //check if input of second input window is allowed and reacts
  const checkInput2 = event => {
    setPlayer2Set(event.target.value);

    if (
      checkValuesLegitimacy(
        parseInt(player1Set),
        parseInt(event.target.value)
      ) &&
      checkLegitTotalInput(parseInt(player1Set), parseInt(event.target.value))
    ) {
      setDifferenz(
        toSecondMode(parseInt(player1Set), parseInt(event.target.value))
      );
      setInputChanged(true);
      setCss("");
      let newSets = currentSets;
      newSets[index - 1] = {
        player1: parseInt(player1Set),
        player2: parseInt(event.target.value)
      };
      changeCurrentSets(newSets);
    } else {
      setInputChanged(false);
      setDifferenz(0);
      setCss("popupEditTable--input");
    }
  };

  //check if input of third input window is allowed and reacts
  const checkInput3 = event => {
    const [player1, player2] = toFirstMode(parseInt(event.target.value));
    setPlayer1Set(player1);
    setPlayer2Set(player2);
    setDifferenz(event.target.value);

    if (
      checkValuesLegitimacy(player1, player2) &&
      checkLegitTotalInput(player1, player2)
    ) {
      setInputChanged(true);
      setCss("");
      let newSets = currentSets;
      newSets[index - 1] = {
        player1: parseInt(player1),
        player2: parseInt(player2)
      };
      changeCurrentSets(newSets);
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };

  const [player1Set, setPlayer1Set] = useState(set.player1);
  const [player2Set, setPlayer2Set] = useState(set.player2);
  const [differenz, setDifferenz] = useState(
    toSecondMode(parseInt(set.player1), parseInt(set.player2))
  );
  let [css, setCss] = useState("");

  return (
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
