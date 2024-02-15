// import SequelizeMatches from '../database/models/SequelizeMatches';
// import MatchesModel from '../models/MatchesModel';
import { TeamInfo } from '../Interfaces/teams/Iteams';
// import { NewMatche } from '../Interfaces/matches/Imatches';
// import SequelizeMatches from '../database/models/SequelizeMatches';

export default class GenerateTeamsInfo {
  static generateInfo(matches: any[], path:string):TeamInfo[] {
    const teamInfoList:TeamInfo[] = [];

    const homeOrAway = path === '/home' ? 'homeTeam' : 'awayTeam';

    matches.forEach((team, index) => {
      const teamInfo = {
        name: team[homeOrAway].teamName,
        totalPoints: this.sumTotalPoints(matches, index, homeOrAway),
        totalGames: this.sumTotalMatches(matches, index, homeOrAway),
        totalVictories: this.sumTotalVictories(matches, index, homeOrAway),
        totalDraws: this.sumTotalDraws(matches, index, homeOrAway),
        totalLosses: this.sumTotalDefeats(matches, index, homeOrAway),
        goalsFavor: this.sumGoalFavor(matches, index, homeOrAway),
        goalsOwn: this.sumGoalOwn(matches, index, homeOrAway),
        goalsBalance: this.calcGoalsBalance(matches, index, homeOrAway),
        efficiency: this.calcEfficiency(matches, index, homeOrAway),
      };

      teamInfoList.push(teamInfo);
    });
    return this.removeDuplicates(teamInfoList);
  }

  static removeDuplicates(matches:TeamInfo[]):TeamInfo[] {
    const uniqueTeams = matches
      .filter((item, index, arr) => arr
        .findIndex((t) => t.name === item.name) === index);

    return uniqueTeams;
  }

  static filterCurrentTeam(matches:any[], index:number, homeOrAway:string):any[] {
    return matches
      .filter((team) => team[homeOrAway].teamName === matches[index][homeOrAway].teamName);
  }

  static sumTotalPoints(matches:any[], index:number, homeOrAway:string):number {
    const newMatchesList = this.filterCurrentTeam(matches, index, homeOrAway);

    return newMatchesList.reduce((acc, curr) => {
      let result = acc;

      if (!curr.inProgress
        && homeOrAway === 'homeTeam'
        && curr.homeTeamGoals > curr.awayTeamGoals) {
        result += 3;
      }

      if (!curr.inProgress
        && homeOrAway === 'awayTeam'
        && curr.homeTeamGoals < curr.awayTeamGoals) {
        result += 3;
      }

      if (!curr.inProgress && curr.homeTeamGoals === curr.awayTeamGoals) {
        result += 1;
      }
      return result;
    }, 0);
  }

  static sumTotalMatches(matches:any[], index:number, homeOrAway:string):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);
    const currentTeam = matches[index][homeOrAway].teamName;
    let result = 0;

    matchesFinish.forEach((team) => {
      if (team[homeOrAway].teamName === currentTeam) {
        result += 1;
      }
    });
    return result;
  }

  static sumTotalVictories(matches:any[], index:number, homeOrAway:string):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index][homeOrAway].teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeOrAway === 'homeTeam'
        && homeTeam.teamName === currentTeam
        && homeTeamGoals > awayTeamGoals) {
        result += 1;
      }

      if (homeOrAway === 'awayTeam'
      && awayTeam.teamName === currentTeam
      && homeTeamGoals < awayTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  static sumTotalDraws(matches:any[], index:number, homeOrAway:string):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index][homeOrAway].teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeOrAway === 'homeTeam'
        && homeTeam.teamName === currentTeam
        && homeTeamGoals === awayTeamGoals) {
        result += 1;
      }

      if (homeOrAway === 'awayTeam'
      && awayTeam.teamName === currentTeam
      && homeTeamGoals === awayTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  static sumTotalDefeats(matches:any[], index:number, homeOrAway:string):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index][homeOrAway].teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeOrAway === 'homeTeam'
      && homeTeam.teamName === currentTeam
      && homeTeamGoals < awayTeamGoals) {
        result += 1;
      }

      if (homeOrAway === 'awayTeam'
      && awayTeam.teamName === currentTeam
      && homeTeamGoals > awayTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  static sumGoalFavor(matches:any[], index:number, homeOrAway:string):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index][homeOrAway].teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeOrAway === 'homeTeam' && homeTeam.teamName === currentTeam) {
        result += homeTeamGoals;
      }

      if (homeOrAway === 'awayTeam' && awayTeam.teamName === currentTeam) {
        result += awayTeamGoals;
      }
    });
    return result;
  }

  static sumGoalOwn(matches:any[], index:number, homeOrAway:string):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index][homeOrAway].teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, awayTeam, awayTeamGoals, homeTeamGoals }) => {
      if (homeOrAway === 'homeTeam' && homeTeam.teamName === currentTeam) {
        result += awayTeamGoals;
      }

      if (homeOrAway === 'awayTeam' && awayTeam.teamName === currentTeam) {
        result += homeTeamGoals;
      }
    });
    return result;
  }

  static calcGoalsBalance(matches:any[], index:number, homeOrAway:string):number {
    const goalsFavor = this.sumGoalFavor(matches, index, homeOrAway);

    const goalsOwn = this.sumGoalOwn(matches, index, homeOrAway);

    return goalsFavor - goalsOwn;
  }

  static calcEfficiency(matches:any[], index:number, homeOrAway:string):string {
    const totalPoints = Number(this.sumTotalPoints(matches, index, homeOrAway));
    const totalMatches = Number(this.sumTotalMatches(matches, index, homeOrAway));

    const multiplication = totalMatches * 3;

    const result = (totalPoints / multiplication) * 100;

    return result.toFixed(2);
  }
}
