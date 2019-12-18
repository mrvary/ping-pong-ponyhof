import React from 'react';
import './App.css';
import Popup from './Popup';

class OldApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      gamesListe: [],
      laufendesSpiel: true,
      lastinterakted: 0
    };
  }

  gamesListe = [
    '23.7.2019',
    '11.8.2019',
    '7.9.2019',
    '22.9.2019',
    '2.10.2019',
    '21.11.2019'
  ];
  laufendesSpiel = true;

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

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
          onClick={this.togglePopup.bind(this)}
        >
          Löschen
        </button>
        {this.state.showPopup ? (
          <Popup
            titleText="Willst du dieses Spiel wirklich löschen?"
            justClosePopup={this.togglePopup.bind(this)}
            deleteAndClose={this.removeFromList.bind(this)}
          />
        ) : null}
      </li>
    );
  }
  //{e => this.removeFromList(this.gamesListe[i], i, e)}
  removeFromList(position) {
    position = this.lastinterakted;
    this.togglePopup();
    if (position === 0) {
      this.laufendesSpiel = false;
    }
    this.setState(
      this.gamesListe.splice(
        this.gamesListe.indexOf(this.gamesListe[position]),
        1
      )
    );
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
              onClick={this.togglePopup.bind(this)}
            >
              Löschen
            </button>
            {this.state.showPopup ? (
              <Popup
                titleText="Willst du dieses Spiel wirklich löschen?"
                justClosePopup={this.togglePopup.bind(this)}
                deleteAndClose={this.removeFromList.bind(this)}
              />
            ) : null //onClick={e => this.removeFromList(this.gamesListe[0], 0, e)}
            }
          </li>
        </div>
      );
    }
  }
}

export default OldApp;
