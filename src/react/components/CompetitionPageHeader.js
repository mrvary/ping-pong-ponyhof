import React from 'react';
import './CompetitionPageHeader.css';
import { Link } from 'react-router-dom';

function CompetitionPage__Header({
  playmode,
  startDate,
  linkTitle,
  linkDestination
}) {
  return (
    <div className="competitionPage__header-alignment">
      {' '}
      <div className="competitionPage__header-logo-alignment">
        <div className="competitionPage__header-logo"></div>
        <Link className="competitionPage__link" to={linkDestination}>
          {' '}
          {linkTitle}{' '}
        </Link>
      </div>
      <div className="competitionPage__header-alignment-right">
        <div className="competitionPage__competition-playmode"> {playmode}</div>
        <div className="competitionPage__competition-startDate">
          {startDate}
        </div>
      </div>
    </div>
  );
}

export default CompetitionPage__Header;
