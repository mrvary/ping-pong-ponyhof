import React, { useState, useEffect } from 'react';
import './StatisticTable.css';
import { useParams } from 'react-router-dom';
import '../Colors.css';
import CompetitionPage__Header from './CompetitionPage__Header';

const StatisticTable = () => {
  const { competitionID } = useParams();
  const linkDestination = '/competition/' + competitionID;

  return (
    <div>
      <p>{competitionID}</p>;
      <CompetitionPage__Header
        playmode="Schweizer System"
        startDate="02.02.2020"
        linkTitle="zurück zum Dashboard"
        linkDestination={linkDestination}
      />
    </div>
  );
};

export default StatisticTable;
