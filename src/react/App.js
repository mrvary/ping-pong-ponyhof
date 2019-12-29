import DisplayDelete from './components/PopupDelete'
import React, { useState } from 'react';
import { channels } from '../shared/channels';
import dummyPlayers from '../assets/players';
import './App.css';


const log = window.log;
const ipcRenderer = window.ipcRenderer;

const USE_BROWSER = false;

const Header = ({ importXML, title, startCompetition }) => {
  return (
    <section className="hero-size">
      <div className="header-box-container">
        <HeaderBox importXML={importXML} startCompetition={startCompetition} />
        <strong className="title-header">{title}</strong>
      </div>
    </section>
  );
};

//Header Box mit Tunier anlegen und XML hochladen
const HeaderBox = ({ importXML, startCompetition }) => {
  return (
    <div className="container-box">
      <p className="text">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} />
      <StartCompetitionButton startCompetition={startCompetition} />
    </div>
  );
};

//Upload Fenster
const UploadXML = ({ importXML }) => {
  return (
    <button className="button-upload-xml" onClick={importXML}>
      Lade hier deine XML Datei hoch!
    </button>
  );
};

//Button zum uploaden
const StartCompetitionButton = ({ startCompetition }) => {
  return (
    <button className="start-competition-button" onClick={startCompetition}>
      Loslegen
    </button>
  );
};

//Liste der "Buttons" mit Löschen Button
//Löschen Button funktioniert nicht
//Angabe der Tunierart fehlt
const ButtonRow = props => {
  const {
    game: { id, date },
    deleteGame,
  } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="button-list">
      <button className="button-game">Spiel vom {date}</button>
      <div className="button-game" />
      <button className="button-delete" onClick={handleShow}>Löschen</button>
      <DisplayDelete show={show} handleClose={handleClose} deleteGame={deleteGame} id={id}></DisplayDelete>
    
    </div>
  );
};
// alternative Modal schreibweise
/*className='popup'
<Popup modal trigger={<button className="button-delete">Löschen</button>}>
        <div className='popup'>
            <p>"Willst du dieses Spiel wirklich löschen?"</p>
            <button onClick={() => deleteGame(id)}>Löschen</button>
        </div>
      </Popup>
      */

const ButtonList = props => {
  const { games, deleteGame} = props;

  return games.map(game => (
    <ButtonRow key={game.id} game={game} deleteGame={deleteGame}/>
  ));
};

const Footer = ({ title }) => {
  return (
    <footer className="center">
      <p className="footer-Line">
        <strong>{title}</strong> by coolest guys ever.
      </p>
    </footer>
  );
};

const App = () => {
  const [games, setGames] = useState([
    { id: 0, date: '23.7.2019' },
    { id: 1, date: '11.8.2019' },
    { id: 2, date: '7.9.2019' },
    { id: 3, date: '22.9.2019' },
    { id: 4, date: '2.10.2019' },
    { id: 5, date: '21.11.2019' }
  ]);
  const [players, setPlayers] = useState([]);
  const [currentId, setCurrentId] = useState(games.length + 1);

 

  const importXML = () => {
    // fake backend data for browser
    if (USE_BROWSER) {
      setPlayers(dummyPlayers);
      return;
    }

    ipcRenderer.send(channels.OPEN_IMPORT_DIALOG);
    ipcRenderer.on(channels.OPEN_IMPORT_DIALOG, (event, args) => {
      const { players } = args;
      log.info(players);
      setPlayers(players);
    });
  };

  const deleteGame = id => {
    setGames(games.filter(game => game.id !== id));
  };

  const startCompetition = () => {
    if (players.length > 0) {
      const date = new Date();
      setGames(games.concat([{ id: currentId, date: date.toLocaleDateString() }]));
      setCurrentId(currentId + 1);
    }
  };

  return (
    <div>
      <Header
        title="PingPongPonyhof"
        importXML={importXML}
        startCompetition={startCompetition}
      />
      <ButtonList games={games} deleteGame={deleteGame}/>
      <Footer title="PingPongPonyhof" />
      <div>
        {players.map(({ person, id }) => (
          <p key={id}>
            {person.firstname} {person.lastname}{' '}
            {person.ttr > 1400 ? '🍑' : '💩'}
          </p>
        ))}
      </div>
      <div className='center'><button
        id="startRound"
        onClick={() => {
          if (USE_BROWSER) {
            return;
          }
          ipcRenderer.send(channels.START_ROUND);
        }}
      >
        start round
      </button></div>
    </div>
  );
};

export default App;
