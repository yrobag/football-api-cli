const Competitions = require('./Components/Competitions');
const Players = require('./Components/Players');
const Teams = require('./Components/Teams');
const Table = require('./Components/Table');
const Fixtures = require('./Components/Fixtures');
const UpdateData = require('./Components/UpdateData');
const ShowData = require('./Components/ShowData');
const GetData = require('./Components/GetData');

const ApiConnection = require('./Components/ApiConnection');


const MainApp = {
    update: (arg) => {
        switch (arg){
            case 'leagues':
                UpdateData.updateAllLeagues();
                break;
            case 'competitions':
                UpdateData.updateCompetitions();
                break;
            default:
                UpdateData.updateLeague(arg)
        }
    },

    setToken: token => {
        ApiConnection.saveToken(token);
    },

    getPlayers: team => {
        let teamId = GetData.getIdByCodeOrName(team);
        if(teamId){
            Players.getPlayers(teamId);
        }
    },

    getTable: league => {
        let leagueId = GetData.getIdByCodeOrName(league);
        if(leagueId){
            Table.getTable(leagueId);
        }
    },

    list: (leagueCode) => {
        if(leagueCode) {
            ShowData.getAvailableTeams(leagueCode);
        }else {
            ShowData.getAvailableCompetitions();

        }
    },

    today: () => {
        Fixtures.getTodayMatches();
    },

    yesterday: () => {
        Fixtures.getYesterdayMatches();
    },

    matchdayFixture: (league, matchday) => {
        let leagueId = GetData.getIdByCodeOrName(league);
        if(leagueId){
            Fixtures.getCompetitionMatchday(leagueId, matchday);
        }
    },

    leagueFixture: (league, nextOrPrevious='n', days=7) => {
        let leagueId = GetData.getIdByCodeOrName(league);
        if(leagueId){
            Fixtures.getCompetitionFixtures(leagueId, nextOrPrevious, days);
        }
    },

    teamFixture: (team, homeOrAway = '', season='') => {
        let teamId = GetData.getIdByCodeOrName(team);
        if(teamId){
            Fixtures.getTeamFixtures(teamId, homeOrAway, season);
        }
    },

};


module.exports = MainApp;













