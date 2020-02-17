import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

//components
import Button from './Button';

function Header({ importXML, title, currentId }) {
  return (
    <section className="header__picture">
      <div className="header__container">
        <HeaderBox importXML={importXML} currentId={currentId} />
        <strong className="header__title">{title}</strong>
      </div>
    </section>
  );
}

const HeaderBox = ({ importXML, currentId }) => {
  const competitionID = '/competition/' + currentId;
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} />
      <Link to={competitionID}>Loslegen</Link>
    </div>
  );
};
//      <Button onClick={startCompetition} mode="primary" text="loslegen" />

const UploadXML = ({ importXML }) => {
  return (
    <button className="header__upload-xml-button" onClick={importXML}>
      Lade hier deine XML Datei hoch!
    </button>
  );
};

export default Header;
