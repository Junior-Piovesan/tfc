import { NewMatche } from '../Interfaces/matches/Imatches';

type TeamInfo = {
  name:string,
  totalPoints:number,
  totalGames:number,
  totalVictories:number,
  totalDraws:number,
  totalLosses:number,
  goalsFavor:number,
  goalsOwn:number,
  goalsBalance:number,
  efficiency:number
};

export default class GenerateTeamsInfo {
  static generateInfo(matches: NewMatche[]):TeamInfo[] {
    const teamInfoList:TeamInfo[] = [];

    matches.forEach((team, index) => {
      const teamInfo = {
        name: team.homeTeam.teamName,
        totalPoints: this.sumTotalPoints(matches, index),
        totalGames: this.sumTotalMatches(matches, index),
        totalVictories: this.sumTotalVictories(matches, index),
        totalDraws: this.sumTotalDraws(matches, index),
        totalLosses: this.sumTotalDefeats(matches, index),
        goalsFavor: this.sumGoalFavor(matches, index),
        goalsOwn: this.sumGoalOwn(matches, index),
        goalsBalance: this.calcGoalsBalance(matches, index),
        efficiency: this.calcEfficiency(matches, index),
      };

      teamInfoList.push(teamInfo);
    });
    return teamInfoList;
  }

  static filterCurrentTeam(matches:NewMatche[], index:number):NewMatche[] {
    return matches
      .filter((team) => team.homeTeam.teamName === matches[index].homeTeam.teamName);
  }

  static sumTotalPoints(matches:NewMatche[], index:number):number {
    const newMatchesList = this.filterCurrentTeam(matches, index);

    return newMatchesList.reduce((acc, curr) => {
      let result = acc;

      if (!curr.inProgress && curr.homeTeamGoals > curr.awayTeamGoals) {
        result += 3;
      }

      if (!curr.inProgress && curr.homeTeamGoals === curr.awayTeamGoals) {
        result += 1;
      }
      return result;
    }, 0);
  }

  static sumTotalMatches(matches:NewMatche[], index:number):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index].homeTeam.teamName;
    let result = 0;

    matchesFinish.forEach(({ homeTeam }) => {
      if (homeTeam.teamName === currentTeam) {
        result += 1;
      }
    });
    return result;
  }

  static sumTotalVictories(matches:NewMatche[], index:number):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index].homeTeam.teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam.teamName === currentTeam && homeTeamGoals > awayTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  static sumTotalDraws(matches:NewMatche[], index:number):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index].homeTeam.teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam.teamName === currentTeam && homeTeamGoals === awayTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  static sumTotalDefeats(matches:NewMatche[], index:number):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index].homeTeam.teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam.teamName === currentTeam && homeTeamGoals < awayTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  static sumGoalFavor(matches:NewMatche[], index:number):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index].homeTeam.teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, homeTeamGoals }) => {
      if (homeTeam.teamName === currentTeam) {
        result += homeTeamGoals;
      }
    });
    return result;
  }

  static sumGoalOwn(matches:NewMatche[], index:number):number {
    const matchesFinish = matches.filter(({ inProgress }) => !inProgress);

    const currentTeam = matches[index].homeTeam.teamName;

    let result = 0;

    matchesFinish.forEach(({ homeTeam, awayTeamGoals }) => {
      if (homeTeam.teamName === currentTeam) {
        result += awayTeamGoals;
      }
    });
    return result;
  }

  static calcGoalsBalance(matches:NewMatche[], index:number):number {
    const goalsFavor = this.sumGoalFavor(matches, index);

    const goalsOwn = this.sumGoalOwn(matches, index);

    return goalsFavor - goalsOwn;
  }

  static calcEfficiency(matches:NewMatche[], index:number):number {
    const totalPoints = Number(this.sumTotalPoints(matches, index));
    const totalMatches = Number(this.sumTotalMatches(matches, index));

    const xablau = totalMatches * 3;

    const result = (totalPoints / xablau) * 100;

    return Number(result.toFixed(2));
  }
}
