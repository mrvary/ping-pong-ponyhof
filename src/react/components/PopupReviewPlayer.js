import { Modal } from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PopupReviewPlayer.css';
import Button from './Button';

function PopupReviewPlayer({
  show,
  handleClose,
  buttonFunk,
  viewedPlayers,
  viewedCompetition
}) {
  console.log('players:', viewedPlayers);
  const playerList = viewedPlayers.filter(player => player.id !== 'FreeTicket');
  return (
    <Modal show={show} onHide={() => handleClose(true)}>
      <Modal.Header closeButton className="popupReviewPlayer__header-text">
        Turnier anlegen
      </Modal.Header>

      <Modal.Body>
        <div className="popupReviewPlayer__centered">
          <strong className="popupReviewPlayer__body-small-text">
            {viewedCompetition.name}
          </strong>
          <p className="popupReviewPlayer__body-smaller-text">
            {viewedCompetition.date}
          </p>
          <p className="popupReviewPlayer__body-smaller-text popupReviewPlayer__extra-margin">
            {viewedCompetition.playmode}
          </p>
          <p className="popupReviewPlayer__body-small-text">
            Folgende {playerList.length} Spieler sind im Turnier:
          </p>
          <div className="popupReviewPlayer__player-List">
            {playerList.map(player => (
              <li key={player.id} className="popupReviewPlayer__names">
                {player.firstname + ' ' + player.lastname}
              </li>
            ))}
          </div>
          <Button
            primText="Hochladen"
            primOnClick={buttonFunk}
            mode="primary"
          ></Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopupReviewPlayer;
