/**
 * @author Marco Goebel
 */

const ipcRenderer = window.ipcRenderer;
const ipcCannels = require("./ipcChannels");

function importXMLFile(callback) {
    ipcRenderer.once(ipcCannels.FILE_IMPORTED, (event, args) => {
        callback();
    });
    ipcRenderer.send(ipcCannels.OPEN_IMPORT_DIALOG);
}

function getAllCompetitions(callback) {
    const competitions = [
        {
            id: 0,
            name: 'BTTV Bavarian TT-Race',
            startDate: '25.05.2019',
            playmode: 'Schweizer System'
        },
        {
            id: 1,
            name: 'BTTV Bavarian TT-Race',
            startDate: '11.08.2019',
            playmode: 'Schweizer System'
        }
    ];

    ipcRenderer.once(ipcCannels.GET_ALL_TOURNAMENTS, (event, args) => {
        const {tournaments} = args;

        const games = tournaments.map(tournament => {
            return {
                id: tournament.id,
                date: tournament.start_date,
                system: "Schweizer System"
            };
        });

        callback(games);
    });

    ipcRenderer.send(ipcCannels.GET_ALL_TOURNAMENTS);
}

function deleteCompetition(id, callback) {
    ipcRenderer.once(ipcCannels.DELETE_TOURNAMENT, (event, args) => {
        callback();
    });

    ipcRenderer.send(ipcCannels.DELETE_TOURNAMENT, {id: id});
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
    importXMLFile,

    getAllCompetitions,
    deleteCompetition,

    getMatchesByCompetition,
    getPlayersByMatchId
};
