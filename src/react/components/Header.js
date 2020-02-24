import React from "react";
import "./Header.css";
import { Redirect } from "react-router-dom";

function Header({
  openXMLDialog,
  importXML,
  title,
  currentId,
  linkDisabled,
  uploadedXML
}) {
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

const HeaderBox = ({
  openXMLDialog,
  importXML,
  currentId,
  linkDisabled,
  uploadedXML
}) => {
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={openXMLDialog} uploadedXML={uploadedXML} />

      <LoslegenLink
        importXML={importXML}
        currentId={currentId}
        linkDisabled={linkDisabled}
      />
    </div>
  );
};

const UploadXML = ({ importXML, uploadedXML }) => {
  let xmlUploadedCss = "header__upload-xml-button";
  let xmlText = "Lade hier deine XML Datei hoch!";

  if (uploadedXML) {
    xmlText = "Upload erfolgreich";
    xmlUploadedCss = xmlUploadedCss + " header__upload-xml-button--true";
  }

  return (
    <button className={xmlUploadedCss} onClick={importXML}>
      {xmlText}
    </button>
  );
};

const LoslegenLink = ({ importXML, currentId, linkDisabled }) => {
  const competition = currentId !== "" ? "/competition/" + currentId : "";
  const linkStatus = "disabled-link-" + linkDisabled;

  if (!linkDisabled) {
    return (
      <div>
        <p onClick={importXML} className={linkStatus}>
          Loslegen
        </p>
        <Redirect to={competition} />
      </div>
    );
  }
  return null;
};

export default Header;
