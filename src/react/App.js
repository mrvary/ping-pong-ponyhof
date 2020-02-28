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

  useEffect(() => {
    getCompetitions();
  }, competitions);

  const getCompetitions = () => {
    if (USE_BROWSER) {
      // init competitions with dummy data
      setCompetitions(dummyCompetitions);
      return;
    }

    // listen to ipc-renderer event to get the data back from ipc-main
    ipcRenderer.once(ipcMessages.GET_COMPETITIONS_RESPONSE, (event, args) => {
      const { competitions } = args;
      setCompetitions(competitions);
    });

    // trigger event to get competitions from ipc-main
    ipcRenderer.send(ipcMessages.GET_COMPETITIONS_REQUEST);
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.GET_COMPETITIONS_REQUEST
    );
  };

  const openXMLDialog = () => {
    ipcRenderer.once(ipcMessages.OPEN_FILE_DIALOG_RESPONSE, (event, args) => {
      console.log(
        "ipc-main --> ipc-renderer:",
        ipcMessages.OPEN_FILE_DIALOG_RESPONSE
      );
      const { message } = args;
      console.log("message:", message);

      // TODO: @William - Prüfe die Message auf "success" oder "cancel"

      getCompetition();

      setLinkDisabled(false);
    });

    ipcRenderer.send(ipcMessages.OPEN_FILE_DIALOG_REQUEST);
  };

  const getCompetition = () => {
    ipcRenderer.once(
      ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE,
      (event, args) => {
        console.log(
          "ipc-main --> ipc-renderer",
          ipcMessages.GET_COMPETITION_PREVIEW_RESPONSE
        );
        console.log(args);
      }
    );

    ipcRenderer.send(ipcMessages.GET_COMPETITION_PREVIEW_REQUEST);
  };

  const importXML = handleShowError => {
    ipcRenderer.once(ipcMessages.IMPORT_XML_FILE_RESPONSE, (event, args) => {
      console.log(
        "ipc-main --> ipc-renderer:",
        ipcMessages.IMPORT_XML_FILE_RESPONSE
      );
      console.log(args);

      const { competitionId, message } = args;

      if (!competitionId) {
        setLinkDisabled(true);
        handleShowError();
        return;
      }

      setCurrentId(competitionId);
    });

    ipcRenderer.send(ipcMessages.IMPORT_XML_FILE_REQUEST);
  };

  const deleteCompetition = id => {
    if (USE_BROWSER) {
      setCompetitions(
        competitions.filter(competition => competition.id !== id)
      );
      return;
    }

    // TODO: Prüfung einbauen
    // Prüfen, ob die Competition im Zustand "Aktiv" ist (siehe 'modules/models/competition.js' --> COMPETITION_STATE)
    // COMPETITION_STATE.COMP_ACTIVE_ ...
    // Je nachdem Popup mit entsprechender Warnung anzeigen

    // listen to ipc-renderer event to update the ui
    ipcRenderer.once(ipcMessages.DELETE_COMPETITION_RESPONSE, event => {
      setCompetitions(
        competitions.filter(competition => competition.id !== id)
      );
    });

    // trigger delete event to
    ipcRenderer.send(ipcMessages.DELETE_COMPETITION_REQUEST, {
      competitionId: id
    });
  };

  return (
    <div className="app__container">
      <Header
        title="PingPongPonyhof"
        openXMLDialog={openXMLDialog}
        importXML={importXML}
        currentId={currentId}
        linkDisabled={linkDisabled}
        setLinkDisabled={setLinkDisabled}
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
