import React from "react";
import "./App.css";
import "bulma/css/bulma.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesListe: [],
      laufendesSpiel: true
    };
  }

  gamesListe = [
    "23.7.2019",
    "11.8.2019",
    "7.9.2019",
    "22.9.2019",
    "2.10.2019",
    "21.11.2019"
  ];
  laufendesSpiel = true;

  render() {
    return (
      <div>
        <header>
          <h1>PingPongPonyhof</h1>
        </header>
        {this.aktuellesSpiel()}
        <h3>Alten Spiele</h3>
        <ul>{this.liste()}</ul>
      </div>
    );
  }

  liste() {
    var htmlList = [];
    for (var i = 1; i < this.gamesListe.length; i++) {
      htmlList.push(this.listElement(i));
    }
    return htmlList;
  }

  listElement(i) {
    return (
      <li className="ausrichtungcheck">
        <button className="button-game">Spiel vom {this.gamesListe[i]}</button>
        <div className="button-game" />
        <button
          className="delete button-delete"
          onClick={e => this.removeFromList(this.gamesListe[i], i, e)}
        >
          Löschen
        </button>
      </li>
    );
  }

  removeFromList(elem, position) {
    if (position === 0) {
      this.laufendesSpiel = false;
    }
    this.setState(this.gamesListe.splice(this.gamesListe.indexOf(elem), 1));
  }

  aktuellesSpiel() {
    if (this.laufendesSpiel === true) {
      return (
        <div>
          <h3>Aktuelles Spiel</h3>
          <li className="ausrichtungcheck">
            <button className="button-game">
              Spiel vom {this.gamesListe[0]}
            </button>
            <div className="button-game" />
            <button
              className="delete button-delete"
              onClick={e => this.removeFromList(this.gamesListe[0], 0, e)}
            >
              Löschen
            </button>
          </li>
        </div>
      );
    }
  }
}

export default App;
