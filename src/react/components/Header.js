import React, { useState } from 'react';
import './Header.css';
import { Redirect } from 'react-router-dom';

//Components
import PopupReviewPlayer from './PopupReviewPlayer';

function Header({
  openXMLDialog,
  importXML,
  title,
  currentId,
  linkDisabled,
  setLinkDisabled
}) {
  return (
    <section className="header__picture">
      <div className="header__container">
        <HeaderBox
          openXMLDialog={openXMLDialog}
          importXML={importXML}
          currentId={currentId}
          linkDisabled={linkDisabled}
          setLinkDisabled={setLinkDisabled}
        />
        <strong className="header__title">{title}</strong>
      </div>
    </section>
  );
}

const HeaderBox = ({
  openXMLDialog,
  importXML,
  currentId,
  linkDisabled,
  setLinkDisabled
}) => {
  const competition = currentId !== '' ? '/competition/' + currentId : '';

  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML openXMLDialog={openXMLDialog} linkDisabled={linkDisabled} />
      <PopupReviewPlayer
        show={!linkDisabled}
        handleClose={setLinkDisabled}
        buttonFunk={() => importXML()}
      ></PopupReviewPlayer>
      <Redirect to={competition} />
    </div>
  );
};

const UploadXML = ({ openXMLDialog, linkDisabled }) => {
  let xmlText = 'Lade hier deine XML Datei hoch!';
  let xmlUploadedCss = 'header__upload-xml-button';

  if (!linkDisabled) {
    xmlText = 'Upload erfolgreich';
    xmlUploadedCss = xmlUploadedCss + ' header__upload-xml-button--true';
  }
  return (
    <button className={xmlUploadedCss} onClick={openXMLDialog}>
      {xmlText}
    </button>
  );
};

export default Header;
