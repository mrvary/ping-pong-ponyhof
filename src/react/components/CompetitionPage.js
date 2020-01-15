import React, { useState, useEffect } from 'react';
import MatchService from '../../services/matchService';
import './CompetitionPage.css';
import { Link, useParams } from 'react-router-dom';

//componenten
import Popup from './Popup';
import Footer from './Footer';
import Button from './Button';

const Header = ({ kind, date, time }) => {
  return (
    <div className="hero-alignment">
      {' '}
      <Link className="link-back-to-overview" to="/">
        {' '}
        zur Übersicht{' '}
      </Link>
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
      <strong className="table__column-alignment"> Tisch </strong>
      <strong className="table__column-alignment"> Spieler 1</strong>
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
      <div className="table__column-alignment"> : </div>
      <div className="table__column-alignment"> Spieler 2 </div>
      <div className="table__column-alignment"> Satz 1 </div>
      <div className="table__column-alignment"> Satz 2 </div>
      <div className="table__column-alignment"> Satz 3 </div>
      <div className="table__column-alignment"> Satz 4 </div>
      <div className="table__column-alignment"> Satz 5 </div>
      <div className="table__column-alignment"> Ergebnis </div>
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
  const { match } = useParams();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const data = MatchService.getMatchesByCompetition(0);
    console.log(data);
    setMatches(data);
  }, []);

  const [showPopupEndTournament, setShowPopupEndTournament] = useState(false);
  const handleCloseEndTournament = () => setShowPopupEndTournament(false);
  const handleShowEndTournament = () => setShowPopupEndTournament(true);

  const [showPopupEndRound, setShowPopupEndRound] = useState(false);
  const handleCloseEndRound = () => setShowPopupEndRound(false);
  const handleShowEndRound = () => setShowPopupEndRound(true);

  const handleEndTournament = () => {
    handleCloseEndTournament();
  };

  const handleEndRound = () => {
    handleCloseEndRound();
  };

  return (
    <div>
      <p>{match}</p>
      <Header kind="Schweizer System" date="xx.xx.2020" time="xx:xx " />
      <IpAdressAndStatisticLink />
      <Table matches={matches} />
      <div className="competitionPage__Bottom-Buttons">
        <Button
          onClick={handleShowEndTournament}
          text="Tunier abschließen"
          mode="primary"
        ></Button>
        <Popup
          show={showPopupEndTournament}
          handleClose={handleCloseEndTournament}
          header="Sicher?"
          bodyText="Möchtest du wirklich das Tunier beenden?"
          buttonFunk={() => handleEndTournament()}
          buttonText="Beenden"
          mode="primary"
        ></Popup>
        <Button
          onClick={handleShowEndRound}
          text="Runde beenden"
          mode="primary"
        ></Button>
        <Popup
          show={showPopupEndRound}
          handleClose={handleCloseEndRound}
          header="Sicher?"
          bodyText="Möchtest du wirklich die Runde beenden?"
          buttonFunk={() => handleEndRound()}
          buttonText="Beenden"
          mode="primary"
        ></Popup>
      </div>

      <Footer title="Die Tabelle" />
    </div>
  );
};

export default CompetitionPage;
