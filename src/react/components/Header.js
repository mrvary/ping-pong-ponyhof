import React from 'react';
import './Header.css';

//components
import Button from './Button';

function Header({ importXML, title, startCompetition }) {
  return (
    <section className="header__picture">
      <div className="header__container">
        <HeaderBox importXML={importXML} startCompetition={startCompetition} />
        <strong className="header__title">{title}</strong>
      </div>
    </section>
  );
}

const HeaderBox = ({ importXML, startCompetition }) => {
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} />
      <Button onClick={startCompetition} mode="primary" text="loslegen" />
    </div>
  );
};

const UploadXML = ({ importXML }) => {
  return (
    <button className="header__upload-xml-button" onClick={importXML}>
      Lade hier deine XML Datei hoch!
    </button>
  );
};

export default Header;
