//import React from "react";
import "./App.css";
import "bulma/css/bulma.css";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { statement } from "@babel/template";

//const refresh = () => {
//  ReactDOM.render(<App />, document.getElementById("root"));
// };

//Header im Hintergrund sollte eigentlich Bild sein aber kann nicht auf assets
//zugreifen
const HeaderPicture = props => {
  return (
    <section className="heroSize">
      <div className="justifyHeader">
        <HeaderBox />
        <strong className="titleHeader">{props.title}</strong>
      </div>
    </section>
  );
};

//Header Box mit Tunier anlegen und XML hochladen
const HeaderBox = () => {
  return (
    <div className="containerBox">
      <p className="text">Neues Turnier anlegen</p>
      <UploadXML />
      <UploadButton />
    </div>
  );
};
//Upload Fenster
const UploadXML = () => {
  return (
    <button className="button-upload-xml">
      Lade hier deine XML Datei hoch!
    </button>
  );
};

//Button zum uploaden
const UploadButton = () => {
  return <button className="button-upload">Loslegen</button>;
};

//Liste der "Buttons" mit Löschen Button
//Löschen Button funktioniert nicht
//Angabe der Tunierart fehlt
const ButtonZeile = probs => {
  const datum = probs.datum;
  const löschen = probs.löschen;
  const id = probs.id;

  return (
    <li className="ausrichtungcheck">
      <button className="button-game">Spiel vom {datum}</button>
      <div className="button-game" />
      <button className="button-delete" onClick={() => löschen(id)}>
        Löschen
      </button>
    </li>
  );
};

const ButtonListe = probs => {
  //const [liste] = useState(0);
  const liste = probs.liste;

  const Delete = id => {
    if (id === 0) {
      liste.splice(liste.indexOf(id), 1);
    }
  };

  var htmlList = [];
  for (var i = 1; i < liste.length; i++) {
    htmlList.push(
      <ButtonZeile datum={liste[i]} id={i} löschen={Delete.bind(this)} />
    );
  }
  return htmlList;
};

//Footer

const Footer = probs => {
  return (
    <footer class="footer">
      <div className="content has-text-centered">
        <p>
          <strong>{probs.title}</strong> by coolest guys ever.
        </p>
      </div>
    </footer>
  );
};

const App = () => {
  var gamesListe = [
    "23.7.2019",
    "11.8.2019",
    "7.9.2019",
    "22.9.2019",
    "2.10.2019",
    "21.11.2019"
  ];

  return (
    <div>
      <HeaderPicture title="PingPongPonyhof" />
      <ButtonListe liste={gamesListe} />
      <Footer title="PingPongPonyhof" />
    </div>
  );
};

export default App;
