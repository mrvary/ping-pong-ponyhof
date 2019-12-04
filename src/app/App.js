import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import 'bulma/css/bulma.css';


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
*/
var gamesListe = ["23.7.2019","11.8.2019","7.9.2019","22.9.2019", "2.10.2019", "21.11.2019"]

function refresh(){
  ReactDOM.render(<App/>, 
  document.getElementById('root'))
}

function liste(){
  var htmlList =[];
  for (var i = 0; i<gamesListe.length; i++){
    htmlList.push(listElement(i));
  }
  return htmlList;
}

function listElement(i){
  return(
    <li className="ausrichtungcheck">
      <button className="button-game">Spiel vom {gamesListe[i]}</button>
      <div className="button-game"/>
      <button className="button-delete" onClick={(e) => removeFromList(gamesListe[i], e)}>Löschen</button>
    </li>
  )
}

function removeFromList(elem){
  gamesListe.splice( gamesListe.indexOf(elem),1);
  refresh();
}


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
        {liste()}
      </ul>
    </div>
  );
}


export default App;
