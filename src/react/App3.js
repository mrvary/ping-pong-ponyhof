//import React from "react";
import "./App.css";
import "bulma/css/bulma.css";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { statement } from "@babel/template";

const refresh = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

const Header = props => {
  return (
    <section className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">{props.title}</h1>
        </div>
      </div>
    </section>
  );
};

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
    }
    liste.splice(liste.indexOf(id), 1);
  };

  var htmlList = [];
  for (var i = 1; i < liste.length; i++) {
    htmlList.push(
      <ButtonZeile datum={liste[i]} id={i} löschen={Delete.bind(this)} />
    );
  }
  return htmlList;
};

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
      <Header title="PingPongPonyhof" />
      <ButtonListe liste={gamesListe} />
      <Footer title="PingPongPonyhof" />
    </div>
  );
};

export default App;
