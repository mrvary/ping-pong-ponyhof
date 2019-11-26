import React from "react";
import "./App.css";
import log from "electron-log";

const ipc = window.require('electron').ipcRenderer;

function App() {
  ipc.on("opened-import-dialog", (event, players) => {
    log.info(players);
  });

  return (
    <div>
      <header>
        <h1>yo</h1>
        <button
          class="button"
          id="openClient"
          onClick={() => ipc.send("open-client")}
        >
          Open Client
        </button>
        <button
          class="button"
          id="xml-import"
          onClick={() => ipc.send("open-import-dialog")}
        >
          import XML
        </button>
        <button
          class="button"
          id="close"
          onClick={() => ipc.send("close-application")}
        >
          close
        </button>
      </header>
    </div>
  );
}

export default App;
