import React, { useState, useEffect } from 'react';
import MatchService from '../../services/matchService';
import './CompetitionPage.css';
import { Link, useParams } from 'react-router-dom';
import '../Colors.css';

//componenten
import Popup from './Popup';
import Footer from './Footer';
import Button from './Button';

const Header = ({ kind, date, time }) => {
  return (
    <div className="competitionPage__header-alignment">
      {' '}
      <Link className="competitionPage__link-back-to-overview" to="/">
        {' '}
        zur Übersicht{' '}
      </Link>
      <div className="competitionPage__competition-kind"> {kind}</div>
      <div className="competitionPage__competition-date">{date}</div>
      <div className="competitionPage__competition-time"> {time} Uhr </div>
    </div>
  );
};

const IpAdressAndStatisticLink = () => {
  return (
    <div className="competitionPage__link-alignment">
      <div className="competitionPage__link-ip-adress-statistic">
        {' '}
        IP-Adresse{' '}
      </div>
      <div className="competitionPage__link-ip-adress-statistic">
        {' '}
        Statistik{' '}
      </div>
    </div>
  );
};

const TableHeadline = () => {
  return (
    <div className="competitionPage__center-table">
      <div className="competitionPage__table__first-row-style">
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Tisch{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Spieler 1
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          :{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Spieler 2{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Satz 1{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Satz 2{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Satz 3{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Satz 4{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Satz 5{' '}
        </strong>
        <strong className="competitionPage__table__column-alignment">
          {' '}
          Ergebnis{' '}
        </strong>
      </div>
    </div>
  );
};

const TableRow = ({ match }) => {
  return (
    <div className="competitionPage__center-table">
      <div className="competitionPage__table__first-row-alignment">
        <div className="competitionPage__table__column-alignment"> </div>
        <div className="competitionPage__table__column-alignment">
          {' '}
          {match.player1}
        </div>
        <div className="competitionPage__table__column-alignment"> : </div>
        <div className="competitionPage__table__column-alignment">
          {' '}
          {match.player2}{' '}
        </div>
        <div className="competitionPage__table__column-alignment"> Satz 1 </div>
        <div className="competitionPage__table__column-alignment"> Satz 2 </div>
        <div className="competitionPage__table__column-alignment"> Satz 3 </div>
        <div className="competitionPage__table__column-alignment"> Satz 4 </div>
        <div className="competitionPage__table__column-alignment"> Satz 5 </div>
        <div className="competitionPage__table__column-alignment">
          {' '}
          Ergebnis{' '}
        </div>
      </div>
    </div>
  );
};

const Table = ({ matches }) => {
  return (
    <div>
      <TableHeadline />
      {matches.map(match => {
        return <TableRow key={match.id} match={match} />;
      })}
    </div>
  );
};

const CompetitionPage = () => {
  //dummy match
  const { competitionID } = useParams();
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
      <p>competitionID: {competitionID}</p>
      <Header />
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
