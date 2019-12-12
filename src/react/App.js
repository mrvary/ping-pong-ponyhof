import './App.css';
import React, { useState } from 'react';

const HeaderPicture = props => {
  return (
    <section className="hero-size">
      <div className="header-box-container">
        <HeaderBox />
        <strong className="title-header">{props.title}</strong>
      </div>
    </section>
  );
};

//Header Box mit Tunier anlegen und XML hochladen
const HeaderBox = () => {
  return (
    <div className="container-box">
      <p className="text">Neues Turnier anlegen</p>
      <UploadXML />
      <StartCompetitionButton />
    </div>
  );
};

//Upload Fenster
const UploadXML = () => {
  return (
    <button className="button-upload-xml">
      Lade hier deine XML Datei hoch!
    </button>
  );
};

//Button zum uploaden
const StartCompetitionButton = () => {
  return <button className="start-competition-button">Loslegen</button>;
};

//Liste der "Buttons" mit Löschen Button
//Löschen Button funktioniert nicht
//Angabe der Tunierart fehlt
const ButtonRow = props => {
  const {
    game: { id, date },
    deleteGame
  } = props;

  return (
    <div className="button-list">
      <button className="button-game">Spiel vom {date}</button>
      <div className="button-game" />
      <button className="button-delete" onClick={() => deleteGame(id)}>
        Löschen
      </button>
    </div>
  );
};

const ButtonList = props => {
  const { games, deleteGame } = props;

  return games.map(game => (
    <ButtonRow key={game.id} game={game} deleteGame={deleteGame} />
  ));
};

const Footer = ({ title }) => {
  return (
    <footer>
      <p>
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

  const deleteGame = id => {
    setGames(games.filter(game => game.id !== id));
  };

  return (
    <div>
      <HeaderPicture title="PingPongPonyhof" />
      <ButtonList games={games} deleteGame={deleteGame} />
      <Footer title="PingPongPonyhof" />
    </div>
  );
};

export default App;
