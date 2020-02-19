import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ importXML, title, currentId, linkDisabled, uploaded }) {
  return (
    <section className="header__picture">
      <div className="header__container">
        <HeaderBox
          importXML={importXML}
          currentId={currentId}
          linkDisabled={linkDisabled}
          uploaded={uploaded}
        />
        <strong className="header__title">{title}</strong>
      </div>
    </section>
  );
}

const HeaderBox = ({ importXML, currentId, linkDisabled, uploaded }) => {
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} uploaded={uploaded} />
      <LoslegenLink currentId={currentId} linkDisabled={linkDisabled} />
    </div>
  );
};
//      <Button onClick={startCompetition} mode="primary" text="loslegen" />

const UploadXML = ({ importXML, uploaded }) => {
  var xmlUploadedCss = 'header__upload-xml-button-' + uploaded;
  var xmlText = 'Lade hier deine XML Datei hoch!';
  if (uploaded === 'true') {
    xmlText = 'Upload erfolgreich';
  }
  return (
    <button className={xmlUploadedCss} onClick={importXML}>
      {xmlText}
    </button>
  );
};

const LoslegenLink = ({ currentId, linkDisabled }) => {
  if (linkDisabled === 'false') {
    var competitionID = '/competition/u' + currentId;
    //var linkStatus = 'disabled-link-' + linkDisabled;

    return (
      <Link to={competitionID} className="header__loslegen-link header__link">
        Loslegen
      </Link>
    );
  }
  return null;
};

export default Header;
