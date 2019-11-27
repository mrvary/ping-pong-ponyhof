function drawNextRound(competition) {

    //in rounds are the already drawed matches - when tournament starts this is empty(.length == 0)
    if(competition.rounds.length == 0){
        drawFirstRound(competition)
    }else{
        drawSecondRound(competition)
    }

  }


      /*@author Daniel
        Auslosung für Runde 1 ist anders
        teile alle TN in obere Hälfte(topPlayers) und untere Hälfte(bottomPlayers)
        wenn TN-Anzahl ungerade dann soll der mittlere Spieler in die stärkere Hälfte

        hole einen zufälligen Spieler aus der oberen und unteren Hälfte und matche diese zusammen
        lösche die beiden Spieler aus dem pool der verfügbaren Spieler
        bei ungerader TN-Anzahl hat so ein zufälliger topPlayer ein freilos

        Eine Aufgabe eines Spielers sollte hier noch nicht vorhanden sein
        -> gibt dieser sofort nach der Aulosung bzw Ausrufe der Spiele auf
        so ist dieses dennoch zu werten 
    */
  function drawFirstRound(competition) {
    let sortedPlayers = sortBy(competition.players, ["ttr"]);
    let matches = [];
    let updatedPlayers = [];

    let topPlayers = sortedPlayers.slice(0, Math.ceil(sortedPlayers.length / 2));
    let bottomPlayers = sortedPlayers.slice(Math.ceil(sortedPlayers.length / 2), sortedPlayers.length);


    while (bottomPlayers.length != 0) {
      const choosenBetterPlayer = topPlayers[Math.floor(Math.random() * topPlayers.length)];
      const choosenWorsePlayer = bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

      //remove choosenPlayer out of top- and bottomPlayers
      topPlayers = topPlayers.filter(player => player !== choosenBetterPlayer);
      bottomPlayers = bottomPlayers.filter(player => player !== choosenWorsePlayer);

      updatedPlayers.push({
        ...choosenBetterPlayer,
        matchesIds: choosenBetterPlayer.matchesIds.concat(competition.matchId)
      });

      updatedPlayers.push({
        ...choosenWorsePlayer,
        matchesIds: choosenWorsePlayer.matchesIds.concat(competition.matchId)
      });

      let match = {
        id: competition.matchId,
        player1: choosenBetterPlayer,
        player2: choosenWorsePlayer,
        round: 1,
        sets: [],
        freeTicket: false
      };
      matches.push(match);

      competition.matchId++;

    }//end while

    //check for ungeradeTN -- create freilos Spiel
    if (topPlayers.length == 1) {

      updatedPlayers.push({
        ...topPlayers[0],
        matchesIds: topPlayers[0].matchesIds.concat(competition.matchId)
      });

      let match = {
        id: competition.matchId,
        player1: topPlayers[0],
        player2: null,
        round: 1,
        sets: [],
        freeTicket: true
      };
      matches.push(match);
    }

    competition.players = updatedPlayers;
    competition.rounds.push(matches);
  }

  //gl hf 
  function drawSecondRound(competition){

  }


  function sortBy(players, selector) {
    return players.sort((playerA, playerB) => {
      return playerB[selector] - playerA[selector];
    });
  }
  module.exports.drawNextRound = drawNextRound;