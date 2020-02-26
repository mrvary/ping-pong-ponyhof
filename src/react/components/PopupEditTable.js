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
  let [player1Set, setPlayer1Set] = useState(set.player1);
  let [player2Set, setPlayer2Set] = useState(set.player2);
  let [css, setCss] = useState("");

  const checkInput1 = event => {
    setPlayer1Set(event.target.value);

    console.log(player1Set + " " + player2Set);
    if (
      (player1Set === 11 && player2Set < 10) ||
      (player2Set === 11 && player1Set < 10) ||
      (player1Set >= 10 && player1Set - player2Set === 2) ||
      (player2Set >= 10 && player2Set - player1Set === 2)
    ) {
      setInputChanged(true);
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };

  const checkInput2 = event => {
    setPlayer2Set(event.target.value);

    console.log(player1Set + " " + player2Set);
    if (player1Set - player2Set >= 2 && (player1Set > 10 || player2Set > 10)) {
      setInputChanged(true);
      setCss("");
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };
  //ganze zahlen
  return (
    <div className="popupEditTable--rows">
      <p>{"Set " + index + "  "}</p>
      <input
        className={css}
        size="2"
        maxLength="2"
        value={player1Set}
        onChange={checkInput1}
      ></input>
      <p> {" : "} </p>
      <input
        className={css}
        size="2"
        maxLength="2"
        value={player2Set}
        onChange={checkInput2}
      ></input>
    </div>
  );
};

export default PopupEditTable;
/*
        value={player1Set}

        value={player2Set}

*/
