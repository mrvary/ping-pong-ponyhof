import React from 'react';
import './Header.css';
import { Link, Redirect } from 'react-router-dom';

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
  const competition = currentId !== '' ? '/competition/' + currentId : '';
  const linkStatus = 'disabled-link-' + linkDisabled;
  return (
    <div className="header__match-box">
      <p className="header__match-box--title">Neues Turnier anlegen</p>
      <UploadXML importXML={openXMLDialog} uploadedXML={uploadedXML} />

      <LoslegenLink currentId={currentId} linkDisabled={linkDisabled} />
    </div>
  );
};
//<Redirect to={competition} />
/*<p onClick={importXML} className={linkStatus}>
        Loslegen
      </p>
*/
const UploadXML = ({ importXML, uploadedXML }) => {
  var xmlUploadedCss = 'header__upload-xml-button';
  var xmlText = 'Lade hier deine XML Datei hoch!';

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
    var competitionID = '/competition/' + currentId;
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
