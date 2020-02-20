/**
 * @author Marco Goebel
 */

const ipcRenderer = window.ipcRenderer;
const ipcChannels = require("./ipcChannels");

function importXMLFile(callback) {
    ipcRenderer.once(ipcChannels.FILE_IMPORTED, (event, args) => {
        callback();
    });
    ipcRenderer.send(ipcChannels.OPEN_IMPORT_DIALOG);
}

function startRound() {
    ipcRenderer.send(ipcChannels.START_ROUND);
}

function getAllCompetitions(callback) {
    ipcRenderer.once(ipcChannels.GET_ALL_COMPETITIONS, (event, args) => {
        const {competitions} = args;
        callback(competitions);
    });

    ipcRenderer.send(ipcChannels.GET_ALL_COMPETITIONS);
}

function deleteCompetition(id, callback) {
    ipcRenderer.once(ipcChannels.DELETE_COMPETITION, (event, args) => {
        callback();
    });

    ipcRenderer.send(ipcChannels.DELETE_COMPETITION, {id: id});
}

function getMatchesByCompetition(compId) {
    const matches0 = [
        {
            id: 0,
            player1: 'Thomas Krause',
            player2: 'Max Müller',
            sets: [],
            freeTicket: false,
            compId: 0
        },
        {
            id: 1,
            player1: 'Janis Huss',
            player2: 'Gerald Knut',
            sets: [],
            freeTicket: false,
            compId: 0
        },
        {
            id: 2,
            player1: 'Jürgen Bach',
            player2: 'Klaus Kraus',
            sets: [],
            freeTicket: false,
            compId: 0
        }
    ];
    const matches1 = [
        {
            id: 3,
            player1: 'Samuel Geiger',
            player2: 'Marius Bach',
            sets: [
                [11, 13],
                [4, 11]
            ],
            freeTicket: false,
            compId: 1
        },
        {
            id: 4,
            player1: 'Edith Finch',
            player2: 'Finch Assozial',
            sets: [
                [13, 15],
                [14, 16]
            ],
            freeTicket: false,
            compId: 1
        }
    ];

    if (compId === 0) return matches0;
    else return matches1;
}

function getPlayersByMatchId(id) {
    const players = [
        {
            id: 'PLAYER1',
            firstname: 'Gerhard',
            lastname: 'Acker',
            clubname: 'ESV SF Neuaubing',
            gamesWon: 3,
            matchIds: [0],
            qttr: 1415,
            active: true,
            hasFreeTicket: false
        },
        {
            id: 'PLAYER2',
            firstname: 'Achim',
            lastname: 'Amthor',
            clubname: 'SC Baldham-Vaterstetten ',
            gamesWon: 5,
            matchIds: [0],
            qttr: 1251,
            active: true,
            hasFreeTicket: false
        },
        {
            id: 'PLAYER3',
            firstname: 'Ulrich',
            lastname: 'Dietzel',
            clubname: 'TTC Friedberg ',
            gamesWon: 1,
            matchIds: [1],
            qttr: 1111,
            active: true,
            hasFreeTicket: false
        }
    ];

    return players.filter(player =>
        player.matchIds.some(matchId => matchId === id)
    );
}

module.exports = {
    // Triggers
    importXMLFile,
    startRound,

    // Competitions
    getAllCompetitions,
    deleteCompetition,

    getMatchesByCompetition,
    getPlayersByMatchId
};
