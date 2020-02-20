import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ importXML, title, currentId, linkDisabled, uploadedXML }) {
  return (
    <section className="header__picture">
      <div className="header__container">
        <HeaderBox
          importXML={importXML}
          currentId={currentId}
          linkDisabled={linkDisabled}
          uploadedXML={uploadedXML}
        />
        <strong className="header__title">{title}</strong>
      </div>
    </section>
  );
}

const HeaderBox = ({ importXML, currentId, linkDisabled, uploadedXML }) => {
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} uploadedXML={uploadedXML} />
      <LoslegenLink currentId={currentId} linkDisabled={linkDisabled} />
    </div>
  );
};
//      <Button onClick={startCompetition} mode="primary" text="loslegen" />

const UploadXML = ({ importXML, uploadedXML }) => {
  let xmlUploadedCss = 'header__upload-xml-button';
  let xmlText = 'Lade hier deine XML Datei hoch!';

  if (uploadedXML) {
    xmlText = 'Upload erfolgreich';
    xmlUploadedCss = xmlUploadedCss + ' header__upload-xml-button--true';
  }
  return (
    <button className={xmlUploadedCss} onClick={importXML}>
      {xmlText}
    </button>
  );
};

const LoslegenLink = ({ currentId, linkDisabled }) => {
  if (!linkDisabled) {
    let competitionID = '/competition/u' + currentId;

    return (
      <Link to={competitionID} className="header__loslegen-link header__link">
        Loslegen
      </Link>
    );
  }
  return null;
};

export default Header;
