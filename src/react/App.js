import React from "react";
import { channels } from "../shared/channels";
import "./App.css";

const log = window.log;
const ipcRenderer = window.ipcRenderer;

function App() {
  const openXML = () => {
    ipcRenderer.send(channels.OPEN_IMPORT_DIALOG);
    ipcRenderer.on(channels.OPEN_IMPORT_DIALOG, (event, args) => {
      const { players } = args;
      log.info(players);
    });
  };
  
  return (
    <div>
      <header>
        <h1>yo</h1>
        <button
          className="button"
          id="openClient"
          onClick={() => ipcRenderer.send(channels.OPEN_CLIENT)}
        >
          Open Client
        </button>
        <button
          className="button"
          id="startRound"
          onClick={() => ipcRenderer.send(channels.START_ROUND)}
        >
          Start Round
        </button>
        <button
          className="button"
          id="xml-import"
          onClick={() => openXML()}
        >
          import XML
        </button>
        <button
          className="button"
          id="close"
          onClick={() => ipcRenderer.send(channels.APP_CLOSE)}
        >
          close
        </button>
      </header>
    </div>
  );
}

export default App;
