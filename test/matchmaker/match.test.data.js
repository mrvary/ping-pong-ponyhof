const testMatches = [{
    id: 0,
    player1:
    {
        id: 'PLAYER10',
        firstname: 'Gerhard Copy',
        lastname: 'Acker',
        clubname: 'ESV SF Neuaubing',
        gamesWon: 3,
        matchIds: [],
        qttr: 1515,
        active: true,
        hasFreeTicket: false
    },
    player2:
    {
        id: 'PLAYER30',
        firstname: 'Ulrich Copy',
        lastname: 'Dietzel',
        clubname: 'TTC Friedberg ',
        gamesWon: 1,
        matchIds: [],
        qttr: 1211,
        active: true,
        hasFreeTicket: false
    },
    sets: [{
        set1: {
            p1Points: 11,
            p2Points: 4
        },
        set2: {
            p1Points: 15,
            p2Points: 13
        },
        set3: {
            p1Points: 11,
            p2Points: 5
        },
    }],
    freeTicket: false
},
{
    id: 1,
    player1:
    {
        id: 'PLAYER1',
        firstname: 'Gerhard',
        lastname: 'Acker',
        clubname: 'ESV SF Neuaubing',
        gamesWon: 3,
        matchIds: [],
        qttr: 1415,
        active: true,
        hasFreeTicket: false
    },
    player2:
    {
        id: 'PLAYER2',
        firstname: 'Achim',
        lastname: 'Amthor',
        clubname: 'SC Baldham-Vaterstetten ',
        gamesWon: 5,
        matchIds: [],
        qttr: 1251,
        active: true,
        hasFreeTicket: false
    },
    sets: [{
        set1: {
            p1Points: 11,
            p2Points: 4
        },
        set2: {
            p1Points: 2,
            p2Points: 11
        },
        set3: {
            p1Points: 0,
            p2Points: 11
        },
        set4: {
            p1Points: 11,
            p2Points: 13
        }
    }],
    freeTicket: false
},
{
    id: 2,
    player1:
    {
        id: 'PLAYER20',
        firstname: 'Achim Copy',
        lastname: 'Amthor',
        clubname: 'SC Baldham-Vaterstetten ',
        gamesWon: 5,
        matchIds: [],
        qttr: 1351,
        active: true,
        hasFreeTicket: false
    },
    player2:
    {
        id: 'PLAYER3',
        firstname: 'Ulrich',
        lastname: 'Dietzel',
        clubname: 'TTC Friedberg ',
        gamesWon: 1,
        matchIds: [],
        qttr: 1111,
        active: true,
        hasFreeTicket: false
    },
    sets: [{
        set1: {
            p1Points: 11,
            p2Points: 4
        },
        set2: {
            p1Points: 2,
            p2Points: 11
        },
        set3: {
            p1Points: 0,
            p2Points: 11
        },
        set4: {
            p1Points: 11,
            p2Points: 9
        },
        set5: {
            p1Points: 11,
            p2Points: 5
        }
    }],
    freeTicket: false
}];

module.exports = { testMatches };