import React from "react";
import "./App.css";
import ReactDOM from "react-dom";

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


function refresh(){
  ReactDOM.render(<App/>, 
  document.getElementById('root'))
}
function liste(games){
    var list =[];
    for (var i = 0; i<games.length; i++){
      list.push(listElement(i,games));
    }
    return list;
}
function listElement(i,games){
    return(
      <li className="ausrichtungcheck">
        <button className="button-game">Spiel vom {games[i]}</button>
        <rect className="button-game"/>
        <button className="button-delete" >Löschen</button>
      </li>
    )
}
/*onClick={removeFromList(i,games)}
function removeFromList(i,games){
    games.splice( games.indexOf(i,1));
    refresh();
}
*/
function App() {
  ipc.on("opened-import-dialog", (event, players) => {
    log.info(players);
  });
  var games = ["22.9.2019","2.10.2019","21.11.2019"]
  
  

  return (
    <div>
      <header>
        <h1>PingPongPonyhof</h1>
      </header> 
      <ul>
        {liste(games)}
      </ul>
    </div>
  );
}


export default App;
