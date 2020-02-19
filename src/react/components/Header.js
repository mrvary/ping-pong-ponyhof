import React from 'react';
import './Header.css';
import { Link, Redirect } from 'react-router-dom';

function Header({ openXMLDialog, importXML, title, currentId, linkDisabled }) {
  return (
    <section className="header__picture">
      <div className="header__container">
        <HeaderBox
          openXMLDialog={openXMLDialog}
          importXML={importXML}
          currentId={currentId}
          linkDisabled={linkDisabled}
        />
        <strong className="header__title">{title}</strong>
      </div>
    </section>
  );
}

const HeaderBox = ({ openXMLDialog, importXML, currentId, linkDisabled }) => {
  const competition = currentId !== '' ? '/competition/u' + currentId : '';
  const linkStatus = 'disabled-link-' + linkDisabled;
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={openXMLDialog} />
      <p onClick={importXML} className={linkStatus}>
          Loslegen
      </p>
      <Redirect to={competition} />
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
