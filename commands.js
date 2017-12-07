#!/usr/bin/env node

const program = require('commander');
const MainApp = require('./index');

program
    .version('0.1.0')
    .description('cli app providing football data from https://api.football-data.org');

program
    .command('update <arg>')
    .alias('u')
    .description('Update data about available temas and leagues. Use "leagues", "competitions" or specific league code as argument')
    .action((arg) => {MainApp.update(arg)});

program
    .command('key <key>')
    .alias('k')
    .description('Set new api key')
    .action((key) => {MainApp.setToken(key)});

program
    .command('players <team>')
    .alias('p')
    .description('Get players from specific league')
    .action((team) => {MainApp.getPlayers(team)});

program
    .command('table <league>')
    .alias('t')
    .description('Get league Table')
    .action((league) => {MainApp.getTable(league)});

program
    .command('list [leagueCode]')
    .alias('l')
    .description('List available teams in specific league or list all leagues(skip argument)')
    .action((leagueCode) => {MainApp.list(leagueCode)});

program
    .command('today')
    .description('Get today matches')
    .action(() => {MainApp.today()});

program
    .command('yesterday')
    .description('Get yesterday matches')
    .action(() => {MainApp.yesterday()});

program
    .command('matchday <league> <matchday>')
    .alias('m')
    .description('Get league specific matchday fixtures')
    .action((league, matchday) => {MainApp.matchdayFixture(league, matchday)});


program
    .command('league <league> [nextOrPrevious] [days]')
    .alias('lf')
    .description('Get league fixtures [nextOrPrevious] = n or p')
    .action((league, nextOrPrevious, days) => {MainApp.leagueFixture(league, nextOrPrevious, days)});

program
    .command('team <team> [season] [homeOrAway]')
    .alias('tf')
    .description('Get team fixtures [homeOrAway] = home or away')
    .action((team, season, homeOrAway) => {MainApp.teamFixture(team, homeOrAway, season)});

program.parse(process.argv);