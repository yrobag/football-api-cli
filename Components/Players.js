const ApiConnection = require('./ApiConnection');

let Players =
    {
        getPlayers: function(teamId) {
            let link = `teams/${teamId}/players`;
            ApiConnection.getData(link, this)
        },

        renderResult: function(response)
        {
            let players = response.data.players;
            players.sort(function (a,b) {
                return a.jerseyNumber - b.jerseyNumber;
            }).map(player => {
                console.info(`${player.jerseyNumber}. ${player.name} (${player.nationality})  - ${player.dateOfBirth} - ${player.contractUntil}`);
            })
        }
    };

module.exports = Players;