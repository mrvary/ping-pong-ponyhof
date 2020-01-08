import React, { useState, useEffect } from 'react';
import MatchService from '../../services/matchService';
import './CompetitionPage.css';

const Header = ({ kind, date, time }) => {
  return (
    <div className="hero-alignment">
      {' '}
      <a
        className="link-back-to-overview"
        href="https://www.google.com/?client=safari"
      >
        {' '}
        zur Übersicht{' '}
      </a>
      <div className="competition-kind"> {kind}</div>
      <div className="competition-date">{date}</div>
      <div className="competition-time"> {time} Uhr </div>
    </div>
  );
};

const IpAdressAndStatisticLink = () => {
  return (
    <div className="link-size">
      <href className="link-ip-adress-statistic"> IP-Adresse </href>
      <href className="link-ip-adress-statistic"> Statistik </href>
    </div>
  );
};

const DescriptionLine = () => {
  return (
    <div className="first-row-box">
      <div className="first-row-alignment">
        <strong> Tisch </strong>
        <strong> Spieler 1</strong>
        <strong> : </strong>
        <strong> Spieler 2 </strong>
        <strong> Satz 1 </strong>
        <strong> Satz 2 </strong>
        <strong> Satz 3 </strong>
        <strong> Satz 4 </strong>
        <strong> Satz 5 </strong>
        <strong> Ergebnis </strong>
      </div>
    </div>
  );
};

const CompetitionPage = () => {
  //dummy game
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const data = MatchService.getMatchesByCompetition(0);
    console.log(data);
    setMatches(data);
  }, []);

  return (
    <div>
      <Header kind="Schweizer System" date="xx.xx.2020" time="xx:xx " />
      <IpAdressAndStatisticLink />
      <DescriptionLine matches={matches} />
      {matches.map(match => {
        return <div>{match.player1}</div>;
      })}
    </div>
  );
};

export default CompetitionPage;
