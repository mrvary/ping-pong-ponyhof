import './App.css';
import React, { useState } from 'react';
import { channels } from '../shared/channels';
import dummyPlayers from '../assets/players';
import Popup from "reactjs-popup";



const log = window.log;
const ipcRenderer = window.ipcRenderer;

const USE_BROWSER = true;

const Header = ({ importXML, title, startCompetition }) => {
  return (
    <section className="hero-size">
      <div className="header-box-container">
        <HeaderBox importXML={importXML} startCompetition={startCompetition} />
        <strong className="title-header">{title}</strong>
      </div>
    </section>
  );
};

//Header Box mit Tunier anlegen und XML hochladen
const HeaderBox = ({ importXML, startCompetition }) => {
  return (
    <div className="container-box">
      <p className="text">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} />
      <StartCompetitionButton startCompetition={startCompetition} />
    </div>
  );
};

//Upload Fenster
const UploadXML = ({ importXML }) => {
  return (
    <button className="button-upload-xml" onClick={importXML}>
      Lade hier deine XML Datei hoch!
    </button>
  );
};

//Button zum uploaden
const StartCompetitionButton = ({ startCompetition }) => {
  return (
    <button className="start-competition-button" onClick={startCompetition}>
      Loslegen
    </button>
  );
};

//Liste der "Buttons" mit Löschen Button
//Löschen Button funktioniert nicht
//Angabe der Tunierart fehlt
const ButtonRow = props => {
  const {
    game: { id, date },
    deleteGame
  } = props;

  return (
    <div className="button-list">
      <button className="button-game">Spiel vom {date}</button>
      <div className="button-game" />
      <Popup modal trigger={<button className="button-delete">Löschen</button>}>
        <div className='popup'>
            <p>"Willst du dieses Spiel wirklich löschen?"</p>
            <button onClick={() => deleteGame(id)}>löschen</button>
        </div>
      </Popup>
    </div>
  );
};

const ButtonList = props => {
  const { games, deleteGame } = props;

  return games.map(game => (
    <ButtonRow key={game.id} game={game} deleteGame={deleteGame}/>
  ));
};

const Footer = ({ title }) => {
  return (
    <footer>
      <p>
        <strong>{title}</strong> by coolest guys ever.
      </p>
    </footer>
  );
};

const App = () => {
  const [games, setGames] = useState([
    { id: 0, date: '23.7.2019' },
    { id: 1, date: '11.8.2019' },
    { id: 2, date: '7.9.2019' },
    { id: 3, date: '22.9.2019' },
    { id: 4, date: '2.10.2019' },
    { id: 5, date: '21.11.2019' }
  ]);
  const [players, setPlayers] = useState([]);
  const [currentId, setCurrentId] = useState(games.length + 1);

  const importXML = () => {
    // fake backend data for browser
    if (USE_BROWSER) {
      setPlayers(dummyPlayers);
      return;
    }

    ipcRenderer.send(channels.OPEN_IMPORT_DIALOG);
    ipcRenderer.on(channels.OPEN_IMPORT_DIALOG, (event, args) => {
      const { players } = args;
      log.info(players);
      setPlayers(players);
    });
  };

  const deleteGame = id => {
    setGames(games.filter(game => game.id !== id));
  };


  const startCompetition = () => {
    if (players.length > 0) {
      const date = new Date();
      setGames(games.concat([{ id: currentId, date: date.toDateString() }]));
      setCurrentId(currentId + 1);
    }
  };

  return (
    <div>
      <Header
        title="PingPongPonyhof"
        importXML={importXML}
        startCompetition={startCompetition}
      />
      <ButtonList games={games} deleteGame={deleteGame}/>
      <Footer title="PingPongPonyhof" />
      <div>
        {players.map(({ person, id }) => (
          <p key={id}>
            {person.firstname} {person.lastname}{' '}
            {person.ttr > 1400 ? '🍑' : '💩'}
          </p>
        ))}
      </div>
      <button
        className="button"
        id="startRound"
        onClick={() => {
          if (USE_BROWSER) {
            return;
          }
          ipcRenderer.send(channels.START_ROUND);
        }}
      >
        start round
      </button>
    </div>
  );
};

export default App;
