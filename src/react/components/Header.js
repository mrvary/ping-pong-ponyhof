import React, { useState } from 'react';
import './Header.css';
import { Redirect } from 'react-router-dom';
import Button from './Button';

function Header({
  openXMLDialog,
  importXML,
  title,
  currentId,
  linkDisabled,
  xmlFilePath
}) {
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
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML openXMLDialog={openXMLDialog} linkDisabled={linkDisabled} />

      <LoslegenLink
        importXML={importXML}
        currentId={currentId}
        linkDisabled={linkDisabled}
      />
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

const LoslegenLink = ({ importXML, currentId, linkDisabled }) => {
  const competition = currentId !== '' ? '/competition/' + currentId : '';

  return (
    <div>
      <Button
        onClick={importXML}
        disableProp={linkDisabled}
        text="Loslegen"
      ></Button>
      <Redirect to={competition} />
    </div>
  );
};

export default Header;
