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
const ipcRenderer = window.electron.ipcRenderer;
const ipcMessages = require("../shared/ipc-messages");
const COMPETITION_STATE = require("../shared/models/competition-state");
// set to true for fake backend data and skip IPC calls
const USE_BROWSER = false;

let competitionID = null;

const App = () => {
  const [currentId, setCurrentId] = useState("");
  const [linkDisabled, setLinkDisabled] = useState(true);
  const [competitions, setCompetitions] = useState([]);

  const [viewedCompetition, setViewedCompetition] = useState({});
  const [viewedPlayers, setViewedPlayers] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [hasActiveGame, setHasActiveGame] = useState(false);

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
    ipcRenderer.once(ipcMessages.GET_COMPETITIONS_RESPONSE, (event, args) => {
      const { competitions } = args;
      setCompetitions(competitions);
      updateActiveState(competitions);
    });

    // trigger event to get competitions from ipc-main
    ipcRenderer.send(ipcMessages.GET_COMPETITIONS_REQUEST);
    console.log(
      "ipc-renderer --> ipc-main:",
      ipcMessages.GET_COMPETITIONS_REQUEST
    );
  };

  const updateActiveState = competitions => {
    setHasActiveGame(false);
    competitions.map(competition => {
      if (
        competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
        competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY
      ) {
        setHasActiveGame(true);
      }
      return null;
    });
  };

  const openXMLDialog = () => {
    ipcRenderer.once(ipcMessages.OPEN_FILE_DIALOG_RESPONSE, (event, args) => {
      console.log(
        "ipc-main --> ipc-renderer:",
        ipcMessages.OPEN_FILE_DIALOG_RESPONSE
      );

      const { message } = args;
      console.log("message:", message);

      if (message === "success") {
        getCompetition();

        setLinkDisabled(false);
      }
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
        const { competition, players } = args;
        competitionID = competition.id;

        setViewedCompetition(competition);
        setViewedPlayers(players);
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
      const { competitionId, message } = args;

      if (!competitionId) {
        setLinkDisabled(true);
        handleShowError();
        setErrorMessage(message);
        return;
      }

      setCurrentId(competitionId);
    });

    ipcRenderer.send(ipcMessages.IMPORT_XML_FILE_REQUEST, {
      competitionId: competitionID
    });
  };

  const deleteCompetition = id => {
    if (USE_BROWSER) {
      setCompetitions(
        competitions.filter(competition => competition.id !== id)
      );
      return;
    }
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
    // set hasActivGame false if deleted competition was activ
    competitions.forEach(competition => {
      if (
        competition.id === id &&
        (competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE ||
          competition.state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY)
      ) {
        setHasActiveGame(false);
      }
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
        viewedPlayers={viewedPlayers}
        viewedCompetition={viewedCompetition}
        errorMessage={errorMessage}
        hasActiveGame={hasActiveGame}
      />
      {competitions.map(competition => (
        <Competition
          key={competition.id}
          competition={competition}
          deleteCompetition={deleteCompetition}
          hasActiveGame={hasActiveGame}
        />
      ))}
      <Footer title="PingPongPonyhof" />
    </div>
  );
};

export default App;
