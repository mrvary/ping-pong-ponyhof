import React, { useState, useEffect } from 'react';
import './App.css';
import './Colors.css';

// dummy data
import dummyCompetitions from "../assets/mock-data/competitions.mock.data";

// components
<<<<<<< HEAD
import Footer from './components/Footer';
import Competition from './components/Competition';
import Header from './components/Header';
=======
import Footer from "./components/Footer";
import Competition from "./components/Competition";
import Header from "./components/Header";
import Button from "./components/Button";
>>>>>>> master

// electron
import IPCService from '../shared/ipc/ipcRendererService';

// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

const App = () => {
<<<<<<< HEAD
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentId, setCurrentId] = useState([]);
<<<<<<< HEAD
  const [linkDisabled, setLinkDisabled] = useState(true);
  const [uploadedXML, setUploadedXML] = useState(false);
=======
  const [linkDisabled, setLinkDisabled] = useState(['true']);
  const [uploaded, setUploaded] = useState(['false']);
=======
  const [competitions, setCompetitions] = useState([]);
  const [xmlFilePath, setXMLFilePath] = useState(null);
  const [currentId, setCurrentId] = useState('');
  const [linkDisabled, setLinkDisabled] = useState(true);
>>>>>>> d569c61dbf64956e294761ebb9263291eefd5b06
>>>>>>> master

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

  const openXMLDialog = () => {
      IPCService.openXMLDialog((filePath) => {
          console.log(filePath);
          setXMLFilePath(filePath);
          setLinkDisabled(false);
      });
  };

  const importXML = () => {
<<<<<<< HEAD
    console.log("XML-Event");
    // fake backend data for browser

    if (USE_BROWSER) {
      setPlayers(dummyPlayers);
      return;
    }

    ipcRenderer.on(channels.FILE_IMPORTED, (event, args) => {
      //const { players } = args;
      //const { matchID } = args;

      //log.info(players);
      setPlayers(players);

      //getAllTournaments(); //vllt nicht machen damit es noch nicht in der liste auftaucht
      //setCurrentId(matchID);
      setLinkDisabled(false);
      setUploadedXML(true);
    });
    ipcRenderer.send(channels.OPEN_IMPORT_DIALOG);
=======
      if (!xmlFilePath) {
          return;
      }

      IPCService.importXMLFile(xmlFilePath, (competitionId, message) => {
          if (!competitionId) {
              console.log(message);
              setLinkDisabled(true);
              return;
          }

          setCurrentId(competitionId);
      })
>>>>>>> d569c61dbf64956e294761ebb9263291eefd5b06
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
        openXMLDialog={openXMLDialog}
        importXML={importXML}
        xmlFilePath={xmlFilePath}
        currentId={currentId}
        linkDisabled={linkDisabled}
        uploadedXML={uploadedXML}
      />
      {competitions.map(competition => (
        <Competition key={competition.id} competition={competition} deleteCompetition={deleteCompetition} />
      ))}
      <Footer title="PingPongPonyhof" />
<<<<<<< HEAD
=======
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
>>>>>>> d569c61dbf64956e294761ebb9263291eefd5b06
    </div>
  );
};

export default App;
