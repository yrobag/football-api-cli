const ApiConnection = require('./ApiConnection');
const dateFormat = require('dateformat');

let Fixtures =
    {

        getFixtures: function(link) {
            ApiConnection.getData(link, this)
        },

        renderResult: function(response)
        {
            let matches = response.data.fixtures;
            matches.map(match => {
                this.drawMatch(match);
            })
        },

        getCompetitionFixtures: function (competitionId, nextOrPrevious='n', days=7) {
            let link = competitionId ? `competitions/${competitionId}/fixtures?timeFrame=${nextOrPrevious}${days}`
                : `fixtures?timeFrame=${nextOrPrevious}${days}`;
            this.getFixtures(link);
        },

        getCompetitionMatchday: function(competitionId, matchday)
        {
            let link = `competitions/${competitionId}/fixtures?matchday=${matchday}`;
            this.getFixtures(link);
        },

        getTodayMatches: function(){
            this.getCompetitionFixtures(null, 'n', 1);
        },

        getYesterdayMatches: function(){
            this.getCompetitionFixtures(null, 'p', 1);
        },

        getTeamFixtures: function(teamId, homeOrAway = '', season='')
        {
            let link =`teams/${teamId}/fixtures?`;

            if(homeOrAway){
                link += `venue=${homeOrAway}&`
            }
            if(season){
                link += `season=${season}`
            }

            this.getFixtures(link);
        },


        drawMatch: function(match)
        {
            let row = '';

            row += this.draw.drawCell(dateFormat(match.date, "dddd, dd.mm.yy, h:MM TT"), 30);
            row += this.draw.drawCell(match.homeTeamName, 30);
            row += this.draw.drawCell(this.getScore(match), 10);
            row += this.draw.drawCell(match.awayTeamName, 30);
            console.log(row);
            this.draw.drawLineSeparator();
        },

        getScore: function(match)
        {
            let home = (match.result.goalsHomeTeam !== null) ? match.result.goalsHomeTeam : '-';
            let away = (match.result.goalsAwayTeam !== null) ? match.result.goalsAwayTeam : '-';
            return `${home}:${away}`;
        },

        draw: require('./Draw')

};

module.exports = Fixtures;

