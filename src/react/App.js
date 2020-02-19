import React, { useState, useEffect } from 'react';
import './App.css';
import './Colors.css';

import ipcChannels from "./ipc/ipcChannels";
// ipc service
import IPCService from './ipc/ipcRendererService';

// dummy data
import dummyPlayers from "../assets/mock-data/players";
import dummyGames from "../assets/mock-data/games";

// components
import Footer from "./components/Footer";
import Competition from "./components/Competition";
import Header from "./components/Header";
import Button from "./components/Button";

// electron
const ipcRenderer = window.ipcRenderer;

// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

const App = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentId, setCurrentId] = useState([]);
  const [linkDisabled, setLinkDisabled] = useState(['true']);

  useEffect(() => {
    getAllCompetitions();
  }, []);

  const getAllCompetitions = () => {
    if (USE_BROWSER) {
      setGames(dummyGames);
      return;
    }

   IPCService.getAllCompetitions((competitions) => {
     setGames(competitions)
   });
  };

  const importXML = () => {
   IPCService.importXMLFile(() => {
       //const { players } = args;
       //const { matchID } = args;

       getAllCompetitions(); //vllt nicht machen damit es noch nicht in der liste auftaucht
       //setCurrentId(matchID);
       setLinkDisabled('false');
   })
  };

  const deleteGame = id => {
    if (USE_BROWSER) {
      setGames(games.filter(game => game.id !== id));
      return;
    }

    IPCService.deleteCompetition(id, () => {
      setGames(games.filter(game => game.id !== id));
    });
  };

  /* outdated
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
    }
  };
  */

  return (
    <div className="app__container">
      <Header
        title="PingPongPonyhof"
        importXML={importXML}
        currentId={currentId}
        linkDisabled={linkDisabled}
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
          ipcRenderer.send(ipcChannels.START_ROUND);
        }}
      ></Button>
    </div>
  );
};

export default App;
