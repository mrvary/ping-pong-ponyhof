import React from 'react';
import './Header.css';

//components
import Button from './Button';

function Header({ importXML, title, startCompetition }) {
  return (
    <section className="hero-size">
      <div className="header-box-container">
        <HeaderBox importXML={importXML} startCompetition={startCompetition} />
        <strong className="title-header">{title}</strong>
      </div>
    </section>
  );
}
const HeaderBox = ({ importXML, startCompetition }) => {
  return (
    <div className="container-box">
      <p className="text">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} />
      <Button onClick={startCompetition} mode="primary" text="loslegen" />
    </div>
  );
};

const UploadXML = ({ importXML }) => {
  return (
    <button className="button-upload-xml" onClick={importXML}>
      Lade hier deine XML Datei hoch!
    </button>
  );
};

export default Header;
