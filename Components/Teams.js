const ApiConnection = require('./ApiConnection');

let Teams =
    {
        getTeams: function(competitionId) {
            let link = `competitions/${competitionId}/teams`;
            ApiConnection.getData(link, this)
        },

        renderResult: function(response)
        {
            let teams = response.data.teams;
            let counter = 1;
            teams.map(team => {
                console.info(`${counter++}. ${team.name} (${team.code})`);
            })
        }
    };

module.exports = Teams;