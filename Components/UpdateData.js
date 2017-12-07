const ApiConnection = require('./ApiConnection');
const fs = require('fs');
const competitionDataFile= `${__dirname}/../Data/Competitions.json`;
const OneLeagueOptionCode = 'league';
const CompetitionsOptionCode = 'competitions';


let UpdateData =
    {
        updateCompetitions: function() {
            let link = 'competitions';
            let options={
                code: CompetitionsOptionCode,
                dir: competitionDataFile
            };
            ApiConnection.updateData(link, this, options)
        },

        updateAllLeagues: function () {
            if (fs.existsSync(competitionDataFile)) {
                const competitionFile = require(competitionDataFile);
                competitionFile.forEach(competition => {
                    this.updateLeague(competition.code);
                });
            }else{
                console.log(`First update competitions`);
            }
        },

        updateLeague: function (leagueCode) {
            if (fs.existsSync(competitionDataFile)) {
                const competitionFile = require(competitionDataFile);
                let league = competitionFile.find(competition => {return leagueCode === competition.code;});
                if(league){
                    let link = `competitions/${league.id}/teams`;
                    let options = {
                        code: OneLeagueOptionCode,
                        dir: `${__dirname}/../Data/${leagueCode}.json`
                    };
                    return ApiConnection.updateData(link, this, options);
                }
            }

            console.log(`League with code '${leagueCode}' does not exist or competitions data is not updated`);
        },

        saveResult: function(response, options)
        {

            let result = (options.code === OneLeagueOptionCode) ?
                this.getLeaguesData(response): this.getCompetitionsData(response);


            fs.writeFile(options.dir, JSON.stringify(result), err => {
                if(err) {
                    return console.log(err);
                }
                console.log(`${options.dir} was updated successfully`);
            });
        },

        getCompetitionsData: function(response)
        {
            let result = [];
            response.data.forEach(data =>{
                if(data.league && data.league !== 'AAL') {
                    result.push({id: data.id, fullName: data.caption, code: data.league});
                }
            });
            return result;
        },

        getLeaguesData: function (response) {
            let result = [];
            response.data.teams.forEach(data => {
                if(data.code || data.shortName) {
                    let href = data._links.self.href;
                    let id = href.slice(href.lastIndexOf('/') + 1);
                    result.push({id: id, code: data.code, name: data.shortName, fullName: data.name});
                }
            });
            return result;
        }
    };

module.exports = UpdateData;