import React, { useState, useEffect } from "react";
import "./App.css";
import "./Colors.css";

// dummy data
import dummyCompetitions from '../assets/mock-data/competitions.mock.data';

// components
import Footer from './components/Footer';
import Competition from './components/Competition';
import Header from './components/Header';

// electron
import IPCService from "../shared/ipc/ipcRendererService";

// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

const App = () => {
  const [currentId, setCurrentId] = useState("");
  const [linkDisabled, setLinkDisabled] = useState(true);
  const [competitions, setCompetitions] = useState([]);
  const [xmlFilePath, setXMLFilePath] = useState(null);

  useEffect(() => {
    getAllCompetitions();
  }, []);

  const getAllCompetitions = () => {
    if (USE_BROWSER) {
      setCompetitions(dummyCompetitions);
      return;
    }

    IPCService.getAllCompetitions(competitions => {
      setCompetitions(competitions);
    });
  };

  const openXMLDialog = () => {
    IPCService.openXMLDialog(filePath => {
      console.log(filePath);
      setXMLFilePath(filePath);
      setLinkDisabled(false);
    });
  };

  const importXML = handleShowError => {
    if (!xmlFilePath) {
      return;
    }

    IPCService.importXMLFile(xmlFilePath, args => {
      const { competitionId, message } = args;

      if (!competitionId) {
        console.log(message);
        setLinkDisabled(true);
        handleShowError();
        return;
      }

      setCurrentId(competitionId);
      return;
    });
  };

  const deleteCompetition = id => {
    if (USE_BROWSER) {
      setCompetitions(
        competitions.filter(competition => competition.id !== id)
      );
      return;
    }

    IPCService.deleteCompetition(id, () => {
      setCompetitions(
        competitions.filter(competition => competition.id !== id)
      );
    });
  };

  return (
    <div className="app__container">
      <Header
        title="PingPongPonyhof"
        openXMLDialog={openXMLDialog}
        importXML={importXML}
        xmlFilePath={xmlFilePath}
        currentId={currentId}
        linkDisabled={linkDisabled}
      />
      {competitions.map(competition => (
        <Competition
          key={competition.id}
          competition={competition}
          deleteCompetition={deleteCompetition}
        />
      ))}
      <Footer title="PingPongPonyhof" />
    </div>
  );
};

export default App;
