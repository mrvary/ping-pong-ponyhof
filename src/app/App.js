import React from "react";
import "./App.css";
//import logo from ;
//import log from "electron-log";
//<img src="bild30.png" alt="Logo" width="100" height="100"/>
//<a className="delete"></a>
const log = window.require('electron-log');
const ipc = window.require('electron').ipcRenderer;
/*<button
          className="button-game"
          id="xml-import"
          onClick={() => ipc.send("open-import-dialog")}
        >
          import XML
        </button>
        <button
          className="button-game"
          id="close"
          onClick={() => ipc.send("close-application")}
        >
          close
        </button>
      */


function App() {
  ipc.on("opened-import-dialog", (event, players) => {
    log.info(players);
  });

  return (
    <div>
      <header>
        <h1>PingPongPonyhof</h1>
      </header>        
        <ul>
          <li className="ausrichtungcheck">
            <button className="button-game">Spiele</button>
            <rect className="button-game"/>
            <button className="button-delete">Löschen</button>
            
          </li>
          <li className="ausrichtungcheck">
            <button className="button-game">Spiele</button>
            <rect className="button-game"/>
            <button className="button-delete">Löschen</button>
            
          </li>
        </ul>
      
    </div>
  );
}

export default App;
