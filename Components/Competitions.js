const ApiConnection = require('./ApiConnection');

let Competitions =
    {
        getCompetitions: function(season='')
        {
            let link = 'competitions';
            link += season ? `?season=${season}` : '';
            ApiConnection.getData(link, this)
        },

        renderResult: function(response)
        {
            response.data.forEach(data =>
                console.log(`${data.id} ${data.caption}`)
            )
        }
    };

module.exports = Competitions;