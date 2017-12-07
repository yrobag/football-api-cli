const api = require('axios');
const fs = require('fs');
let headers = {};

if (fs.existsSync('./token.json')) {
    const secret = require('../token.json');
    headers = {'X-Auth-Token': secret.token}
}


let ApiConnection =
    {
        apiUrl: 'http://api.football-data.org/v1/',
        headers: headers,

        getData: function(link, component)
        {
            api.get(this.apiUrl + link, {headers: this.headers})
                .then(response => {component.renderResult(response)}).catch(error => console.log(error.response.data.error));
        },

        updateData: function(link, component, options)
        {
            api.get(this.apiUrl + link, {headers: this.headers})
                .then(response => {component.saveResult(response, options)}).catch(error => console.log(error.response.data.error));
        },
        
        saveToken: function (token) {
            fs.writeFile(`${__dirname}/../token.json`, `{"token": "${token}"}`, err => {
                if(err) {
                    return console.log(err);
                }

                console.log("Token was saved successfully");
            });
        },


    };

module.exports = ApiConnection;