const ApiConnection = require('./ApiConnection');

let Table =
{

    getTable: function(competitionId)
    {
        let link = `competitions/${competitionId}/leagueTable`;
        ApiConnection.getData(link, this)
    },

    renderResult: function(response)
    {
        this.drawTableTitle(response.data);
        this.drawTableHeader();
        response.data.standing.map(team=>{
            this.drawTableRow(team);
        })
    },

    drawTableTitle: function (response)
    {
        console.log(`${response.leagueCaption.toUpperCase()}, MATCHDAY ${response.matchday} STANDING:`);
    },

    drawTableRow: function (team)
    {
        let line = '';
        this.tableHeader.forEach(element => {
            line += this.draw.drawCell(team[element.code], element.width, '|');
        });
        console.log(line);
        this.draw.drawLineSeparator();
    },


    drawTableHeader: function()
    {
        let header ='';
        this.tableHeader.forEach(element => {
            header += this.draw.drawCell(element.label, element.width, '|');
        });
        console.log(header);
        this.draw.drawLineSeparator();
    },

    tableHeader: [
        {
            label: 'Pos.',
            code: 'position',
            width: 8
        },
        {
            label: 'Team',
            code: 'teamName',
            width: 30
        },
        {
            label: 'Games',
            code: 'playedGames',
            width: 8
        },
        {
            label: 'W',
            code: 'wins',
            width: 8
        },
        {
            label: 'D',
            code: 'draws',
            width: 8
        },
        {
            label: 'L',
            code: 'losses',
            width: 8
        },
        {
            label: '+',
            code: 'goals',
            width: 8
        },
        {
            label: '-',
            code: 'goalsAgainst',
            width: 8
        },
        {
            label: 'Points',
            code: 'points',
            width: 8
        },

    ],

    draw: require('./Draw')
};

module.exports = Table;