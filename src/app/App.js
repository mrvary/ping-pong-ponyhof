import React from "react";
import "./App.css";
import 'bulma/css/bulma.css';

//import logo from ;
//import log from "electron-log";
//<img src="bild30.png" alt="Logo" width="100" height="100"/>
//<a className="delete"></a>

/*<button
          className="button-game"
          id="xml-import"
          onClick={() => ipc.send("open-import-dialog")}
        >
          import XML
        </button>
*/


class App extends React.Component{

  //TODO: redo connection
  //const log = window.require('electron-log');
  //const ipc = window.require('electron').ipcRenderer;
  //ipc.on("opened-import-dialog", (event, players) => {
  //  log.info(players);
  //});

  constructor(props){
      super(props);
      this.state = {
        gamesListe : [],
        laufendesSpiel : true
    };
  }
  gamesListe = ["23.7.2019","11.8.2019","7.9.2019","22.9.2019", "2.10.2019", "21.11.2019"];
  laufendesSpiel = true;

  render (){
    return (
    
     
<body >


<section class="hero is-medium is-primary is-bold">
       <div class="hero-body">
       <div class="container has-text-centered">

         <h1 class="title">
           PingPongPonyhof
         </h1>
        </div>
       </div>
      </section>

  
     <section class="section">
      {this.aktuellesSpiel()}
      </section>

      <section class="section">
      <h3>Alten Spiele</h3>
      <ul>
        {this.liste()}
      </ul>
      </section>
      

      <section class="section">
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>PingPongPonyhof</strong> by coolest guys ever. 
          </p>
        </div>
      </footer>
      </section>

      </body>



    );

  }

  liste(){
    var htmlList =[];
    for (var i = 1; i<this.gamesListe.length; i++){
      htmlList.push(this.listElement(i));
    }
    return htmlList;
  }
  
  listElement(i){
    return(
      <li className="ausrichtungcheck">
        <button className="button-game">Spiel vom {this.gamesListe[i]}</button>
        <div className="button-game"/>
        <button className="button-delete" onClick={(e) => this.removeFromList(this.gamesListe[i], i, e)}>Löschen</button>
      </li>
    )
  }
  
  removeFromList(elem, position){
    if (position === 0){
      this.laufendesSpiel = false
    }
    this.setState(this.gamesListe.splice( this.gamesListe.indexOf(elem),1));
  }
  aktuellesSpiel(){
    if (this.laufendesSpiel===true){
      return(
        <div> 
          <h3>Aktuelles Spiel</h3>
          <li className="ausrichtungcheck">
            <button className="button-game">Spiel vom {this.gamesListe[0]}</button>
            <div className="button-game"/>
             <button className="button-delete" onClick={(e) => this.removeFromList(this.gamesListe[0], 0, e )}>Löschen</button>
          </li>
        </div>
      )
    }
  }
}


export default App;
