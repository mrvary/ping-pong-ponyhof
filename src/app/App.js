import React from "react";
import "./App.css";

const log = window.log;
const ipcRenderer = window.ipcRenderer;

function App() {
  ipcRenderer.on("opened-import-dialog", (event, players) => {
    log.info(players);
  });

  return (
    <div>
      <header>
        <h1>yo</h1>
        <button
          class="button"
          id="openClient"
          onClick={() => ipcRenderer.send("open-client")}
        >
          Open Client
        </button>
        <button
          class="button"
          id="xml-import"
          onClick={() => ipcRenderer.send("open-import-dialog")}
        >
          import XML
        </button>
        <button
          class="button"
          id="close"
          onClick={() => ipcRenderer.send("close-application")}
        >
          close
        </button>
      </header>
    </div>
  );
}

export default App;
