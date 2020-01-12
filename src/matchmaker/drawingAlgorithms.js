//Algorithms for drawing first round
// pairPlayers : { top: [players], bottom: [players]} -> [{ player1: player, player2: player}]
function pairPlayersRoundOne({ top, bottom }) {
    let bottomPlayers = bottom;
    let topPlayers = top;
    let pairings = [];

    while (bottomPlayers.length !== 0) {
        const randomTopPlayer =
            topPlayers[Math.floor(Math.random() * topPlayers.length)];
        const randomBottomPlayer =
            bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

        //remove chosen players
        topPlayers = topPlayers.filter(player => player !== randomTopPlayer);
        bottomPlayers = bottomPlayers.filter(
            player => player !== randomBottomPlayer
        );

        pairings.push({ player1: randomTopPlayer.id, player2: randomBottomPlayer.id });
    }

    return pairings;
}

// separateTopFromBottomPlayers : [players] -> { top: [players], bottom: [players]}
function separateTopFromBottomPlayers(players) {
    const sortedPlayers = sortPlayersBy(players, "qttr");
    const top = sortedPlayers.slice(0, Math.ceil(sortedPlayers.length / 2));
    const bottom = sortedPlayers.slice(Math.ceil(sortedPlayers.length / 2));

    return { top, bottom };
}


//Algorithms for drawing later round







//Help functions

// sortPlayersBy : [players] -> [players]
function sortPlayersBy(players, selector) {
    return players.sort((playerA, playerB) => {
        return playerB[selector] - playerA[selector];
    });
}

// shuffle : [a] -> [a]
function shuffle(array) {
    const TIMES = array.length;
    for (let i = 0; i < TIMES; i++) {
        const first = Math.floor(Math.random() * array.length);
        const second = Math.floor(Math.random() * array.length);
        [array[first], array[second]] = [array[second], array[first]];
    }
    return array;
}



module.exports = {
    // pubic
    pairPlayersRoundOne,
    separateTopFromBottomPlayers,
    sortPlayersBy,
    shuffle

};