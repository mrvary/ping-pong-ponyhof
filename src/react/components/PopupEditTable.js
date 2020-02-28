import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopupEditTable.css";
import Button from "./Button";

function PopupEditTable({ show, handleClose, sets, saveChanges }) {
  const [inputChanged, setInputChanged] = useState(false);

  const endPopup = () => {
    setInputChanged(false);
    saveChanges();
    //TODO: speichern
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Edit</Modal.Header>

      <Modal.Body>
        <DisplaySetHandler
          sets={sets}
          setInputChanged={setInputChanged}
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
const DisplaySetHandler = ({ sets, setInputChanged }) => {
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
            setInputChanged={setInputChanged}
          ></DisplaySet>
        );
      })}
    </div>
  );
};
const DisplaySet = ({ set, index, setInputChanged }) => {
  const [player1Set, setPlayer1Set] = useState(set.player1);
  const [player2Set, setPlayer2Set] = useState(set.player2);
  let [css, setCss] = useState("");

  const checkValues = (input1, input2) => {
    return (
      (input1 === "11" && input2 < 10 && input2 >= 0) ||
      (input2 === "11" && input1 < 10 && input1 >= 0) ||
      (input1 >= 9 && input2 - input1 === 2) ||
      (input2 >= 9 && input1 - input2 === 2)
    );
  };

  const checkInput1 = event => {
    setPlayer1Set(event.target.value);

    if (checkValues(event.target.value, player2Set)) {
      setInputChanged(true);
      setCss("");
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };

  const checkInput2 = event => {
    setPlayer2Set(event.target.value);

    if (checkValues(event.target.value, player1Set)) {
      setInputChanged(true);
      setCss("");
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };
  return (
    //todo stop negatives
    <div className="popupEditTable--rows">
      <p>{"Set " + index + "  "}</p>
      <input
        className={css}
        type="number"
        size="2"
        maxLength="2"
        value={player1Set}
        onChange={checkInput1}
        name="player1Set"
      ></input>
      <p> {" : "} </p>
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
