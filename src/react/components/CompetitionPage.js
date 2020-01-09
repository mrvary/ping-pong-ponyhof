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

const TableHeadline = () => {
  return (
    <div className="table__first-row-alignment">
      <div className="table__column-alignment"> Tisch </div>
      <div className="table__column-alignment"> Spieler 1</div>
      <strong className="table__column-alignment"> : </strong>
      <strong className="table__column-alignment"> Spieler 2 </strong>
      <strong className="table__column-alignment"> Satz 1 </strong>
      <strong className="table__column-alignment"> Satz 2 </strong>
      <strong className="table__column-alignment"> Satz 3 </strong>
      <strong className="table__column-alignment"> Satz 4 </strong>
      <strong className="table__column-alignment"> Satz 5 </strong>
      <strong className="table__column-alignment"> Ergebnis </strong>
    </div>
  );
};

const TableRow = ({ match }) => {
  return (
    <div className="table__first-row-alignment">
      <div className="table__column-alignment"> </div>
      <div className="table__column-alignment"> {match.player1}</div>
      <strong className="table__column-alignment"> : </strong>
      <strong className="table__column-alignment"> Spieler 2 </strong>
      <strong className="table__column-alignment"> Satz 1 </strong>
      <strong className="table__column-alignment"> Satz 2 </strong>
      <strong className="table__column-alignment"> Satz 3 </strong>
      <strong className="table__column-alignment"> Satz 4 </strong>
      <strong className="table__column-alignment"> Satz 5 </strong>
      <strong className="table__column-alignment"> Ergebnis </strong>
    </div>
  );
};

const Table = ({ matches }) => {
  return (
    <div>
      <TableHeadline />
      {matches.map(match => {
        return <TableRow match={match} />;
      })}
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
      <Table matches={matches} />
    </div>
  );
};

export default CompetitionPage;
