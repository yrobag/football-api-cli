const fs = require('fs');
const competitionDataFile= `${__dirname}/../Data/Competitions.json`;

let ShowData =
    {
        getAvailableCompetitions: function()
        {
            this.getData(competitionDataFile);
        },

        getAvailableTeams: function(leagueCode)
        {
            let file = `${__dirname}/../Data/${leagueCode.toUpperCase()}.json`;
            this.getData(file)
        },

        getData(file){
            if (fs.existsSync(competitionDataFile)) {
                let competitions = require(file);
                this.drawTableHeader();
                competitions.forEach(competition => {
                    this.drawTableRow(competition);
                })
            }else{
                console.log(`File ${file} does not exist.`);
            }
        },

        drawTableRow: function (rowData)
        {
            let line = '';
            this.tableHeader.forEach(element => {
                line += this.draw.drawCell(rowData[element.code], element.width, '|');
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
                label: 'Name',
                code: 'fullName',
                width: 50
            },
            {
                label: 'Short Name',
                code: 'name',
                width: 30
            },
            {
                label: 'Code',
                code: 'code',
                width: 20
            },

        ],

        draw: require('./Draw')

    };

module.exports = ShowData;