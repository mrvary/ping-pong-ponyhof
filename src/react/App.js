import React, { useState, useEffect } from "react";
import "./App.css";
import "./Colors.css";

// dummy data
import dummyCompetitions from "../assets/mock-data/competitions.mock.data";

// components
import Footer from "./components/Footer";
import Competition from "./components/Competition";
import Header from "./components/Header";

// electron
import IPCService from "../shared/ipc/ipcRendererService";
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../shared/ipc-messages");

// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

const App = () => {
  const [currentId, setCurrentId] = useState("");
  const [linkDisabled, setLinkDisabled] = useState(true);
  const [competitions, setCompetitions] = useState([]);
  const [xmlFilePath, setXMLFilePath] = useState(null);

  useEffect(() => {
    getCompetitions();
  }, []);

  const getCompetitions = () => {
    if (USE_BROWSER) {
      // init competitions with dummy data
      setCompetitions(dummyCompetitions);
      return;
    }

    // listen to ipc-renderer event to get the data back from ipc-main
    ipcRenderer.once(
      ipcMessages.GET_COMPETITIONS_RESPONSE,
      (event, { competitions }) => {
        setCompetitions(competitions);
      }
    );

    // trigger event to get competitions from ipc-main
    ipcRenderer.send(ipcMessages.GET_COMPETITIONS_REQUEST);
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
