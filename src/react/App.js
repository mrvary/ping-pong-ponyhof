import React, { useState, useEffect } from 'react';
import './App.css';
import './Colors.css';

import { channels } from '../shared/channels';

// dummy data
import dummyPlayers from '../assets/players';
import dummyGames from '../assets/games';

// components
import Footer from './components/Footer';
import Competition from './components/Competition';
import Header from './components/Header';
import Button from './components/Button';

// electron
const log = window.log;
const ipcRenderer = window.ipcRenderer;

// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

const App = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentId, setCurrentId] = useState(games.length + 1);

  useEffect(() => {
    getAllTournaments();
  }, []);

  const getAllTournaments = () => {
    if (USE_BROWSER) {
      setGames(dummyGames);
      return;
    }

    ipcRenderer.on(channels.GET_ALL_TOURNAMENTS, (event, args) => {
      const { tournaments } = args;
      log.info(tournaments);

      const temp = tournaments.map(tournament => {
        return {
          id: tournament.id,
          date: tournament.start_date,
          system: 'Schweizer System'
        };
      });

      setGames(temp);
    });

    ipcRenderer.send(channels.GET_ALL_TOURNAMENTS);
  };

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

      getAllTournaments();
    });
  };

  const deleteGame = id => {
    if (USE_BROWSER) {
      setGames(games.filter(game => game.id !== id));
      return;
    }

    ipcRenderer.on(channels.DELETE_TOURNAMENT, (event, args) => {
      setGames(games.filter(game => game.id !== id));
    });

    ipcRenderer.send(channels.DELETE_TOURNAMENT, { id: id });
  };

  const startCompetition = () => {
    if (players.length > 0) {
      const date = new Date();
      setGames(
        games.concat([
          {
            id: currentId,
            date: date.toLocaleDateString(),
            system: 'Schweizer System'
          }
        ])
      );
      setCurrentId(currentId + 1);
      //TODO: clear players
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
