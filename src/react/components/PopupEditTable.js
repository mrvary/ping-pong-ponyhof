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

  const checkInput1 = event => {
    console.log("event:" + event.target.value);
    setPlayer1Set(event.target.value);
    setPlayer1Set(event.target.value);

    console.log(player1Set + " " + player2Set);
    if (
      (player1Set === 11 && player2Set < 10) ||
      (player2Set === 11 && player1Set < 10) ||
      (player1Set >= 9 && player2Set - player1Set === 2) ||
      (player2Set >= 9 && player1Set - player2Set === 2)
    ) {
      setInputChanged(true);
      setCss("");
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };

  const checkInput2 = event => {
    setPlayer2Set(event.target.value);

    console.log(player1Set + " " + player2Set);
    console.log(player2Set < 10);

    if (
      (player1Set === 11 && player2Set < 10) ||
      (player2Set === 11 && player1Set < 10) ||
      (player1Set >= 9 && player2Set - player1Set === 2) ||
      (player2Set >= 9 && player1Set - player2Set === 2)
    ) {
      setInputChanged(true);
      setCss("");
    } else {
      setInputChanged(false);
      setCss("popupEditTable--input");
    }
  };
  //ganze zahlen
  return (
    //todo stop negatives
    <div className="popupEditTable--rows">
      <p className="popupEditTable--text">{"Set " + index + "  "}</p>
      <input
        className={css}
        type="number"
        size="2"
        maxLength="2"
        value={player1Set}
        onChange={checkInput1}
        name="player1Set"
      ></input>
      <p className="popupEditTable--text"> {" : "} </p>
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
/*
        value={player1Set}

        value={player2Set}

*/
