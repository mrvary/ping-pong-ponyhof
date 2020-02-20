import React from 'react';
import './Header.css';
import { Link, Redirect } from 'react-router-dom';

<<<<<<< HEAD
function Header({ importXML, title, currentId, linkDisabled, uploadedXML }) {
=======
<<<<<<< HEAD
function Header({ importXML, title, currentId, linkDisabled, uploaded }) {
=======
function Header({ openXMLDialog, importXML, title, currentId, linkDisabled }) {
>>>>>>> d569c61dbf64956e294761ebb9263291eefd5b06
>>>>>>> master
  return (
    <section className="header__picture">
      <div className="header__container">
        <HeaderBox
          openXMLDialog={openXMLDialog}
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

<<<<<<< HEAD
const HeaderBox = ({ importXML, currentId, linkDisabled, uploadedXML }) => {
=======
<<<<<<< HEAD
const HeaderBox = ({ importXML, currentId, linkDisabled, uploaded }) => {
>>>>>>> master
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={importXML} uploadedXML={uploadedXML} />
      <LoslegenLink currentId={currentId} linkDisabled={linkDisabled} />
=======
const HeaderBox = ({ openXMLDialog, importXML, currentId, linkDisabled }) => {
  const competition = currentId !== '' ? '/competition/' + currentId : '';
  const linkStatus = 'disabled-link-' + linkDisabled;
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={openXMLDialog} />
      <p onClick={importXML} className={linkStatus}>
          Loslegen
      </p>
      <Redirect to={competition} />
>>>>>>> d569c61dbf64956e294761ebb9263291eefd5b06
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
