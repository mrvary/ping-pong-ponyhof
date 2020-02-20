import React, { useState, useEffect } from 'react';
import './App.css';
import './Colors.css';

// ipc service
import IPCService from './ipc/ipcRendererService';

// dummy data
import dummyCompetitions from "../assets/mock-data/competitions.mock.data";

// components
import Footer from "./components/Footer";
import Competition from "./components/Competition";
import Header from "./components/Header";
import Button from "./components/Button";

// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

const App = () => {
  const [competitions, setCompetitions] = useState([]);
  const [currentId, setCurrentId] = useState([]);
  const [linkDisabled, setLinkDisabled] = useState(['true']);

  useEffect(() => {
    getAllCompetitions();
  }, []);

  const getAllCompetitions = () => {
    if (USE_BROWSER) {
      setCompetitions(dummyCompetitions);
      return;
    }

   IPCService.getAllCompetitions((competitions) => {
     setCompetitions(competitions)
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

  const deleteCompetition = id => {
    if (USE_BROWSER) {
      setCompetitions(competitions.filter(competition => competition.id !== id));
      return;
    }

    IPCService.deleteCompetition(id, () => {
      setCompetitions(competitions.filter(competition => competition.id !== id));
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
      {competitions.map(competition => (
        <Competition key={competition.id} competition={competition} deleteCompetition={deleteCompetition} />
      ))}
      <Footer title="PingPongPonyhof" />
      <Button
        mode="primary"
        text="start Round"
        onClick={() => {
          if (USE_BROWSER) {
            return;
          }
          IPCService.startRound();
        }}
      ></Button>
    </div>
  );
};

export default App;
