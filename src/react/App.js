import React, { useState } from "react";
import { channels } from "../shared/channels";
import dummyPlayers from "../assets/players";
import "./App.css";

// components
import Footer from "./components/Footer";
import Competition from "./components/Competition";

const log = window.log;
const ipcRenderer = window.ipcRenderer;

// set to true for fake backend data and skip IPC calls
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

const HeaderBox = ({ importXML, startCompetition }) => {
  return (
    <div className="container-box">
      <p className="text">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} />
      <StartCompetitionButton startCompetition={startCompetition} />
    </div>
  );
};

const UploadXML = ({ importXML }) => {
  return (
    <button className="button-upload-xml" onClick={importXML}>
      Lade hier deine XML Datei hoch!
    </button>
  );
};

const StartCompetitionButton = ({ startCompetition }) => {
  return (
    <button className="start-competition-button" onClick={startCompetition}>
      Loslegen
    </button>
  );
};

const ButtonList = props => {
  const { games, deleteGame } = props;

  return games.map(game => (
    <Competition key={game.id} game={game} deleteGame={deleteGame} />
  ));
};

const App = () => {
  const [games, setGames] = useState([
    { id: 0, date: "23.7.2019" },
    { id: 1, date: "11.8.2019" },
    { id: 2, date: "7.9.2019" },
    { id: 3, date: "22.9.2019" },
    { id: 4, date: "2.10.2019" },
    { id: 5, date: "21.11.2019" }
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
    ipcRenderer.on(channels.FILE_IMPORTED, (event, args) => {
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
      setGames(
        games.concat([{ id: currentId, date: date.toLocaleDateString() }])
      );
      setCurrentId(currentId + 1);
    }
  };

  return (
    <div className="app__container">
      <Header
        title="PingPongPonyhof"
        importXML={importXML}
        startCompetition={startCompetition}
      />
      <ButtonList games={games} deleteGame={deleteGame} />
      <Footer title="PingPongPonyhof" />
      <div className="center">
        <button
          className="start-competition-button"
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
    </div>
  );
};

export default App;
