import React, { useState } from 'react';
import { channels } from '../shared/channels';
import dummyPlayers from '../assets/players';
import './App.css';
import './Colors.css';

// components
import Footer from './components/Footer';
import Competition from './components/Competition';
import Header from './components/Header';
import Button from './components/Button';

const log = window.log;
const ipcRenderer = window.ipcRenderer;

// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

const App = () => {
  const [games, setGames] = useState([
    { id: 0, date: '23.7.2019',system: "Schweizer System"},
    { id: 1, date: '11.8.2019',system: "Schweizer System" },
    { id: 2, date: '7.9.2019',system: "Schweizer System" },
    { id: 3, date: '22.9.2019',system: "Schweizer System" },
    { id: 4, date: '2.10.2019',system: "Schweizer System" },
    { id: 5, date: '21.11.2019',system: "Schweizer System" }
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
      {games.map(game => (
        <Competition key={game.id} game={game} deleteGame={deleteGame} />
      ))}
      <Footer title="PingPongPonyhof" />
      <Button
        mode="primary"
        text="start Round"
        onClick={() => {
          if (USE_BROWSER) {
            return;
          }
          ipcRenderer.send(channels.START_ROUND);
        }}
      ></Button>
    </div>
  );
};

export default App;
