import { TeamInfo } from '../Interfaces/teams/Iteams';

const sortListTeamInfo = (list:TeamInfo[]):TeamInfo[] => list.sort((a, b) => {
  if (a.totalPoints !== b.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }
  if (a.totalVictories !== b.totalVictories) {
    return b.totalVictories - a.totalVictories;
  }
  if (a.goalsBalance !== b.goalsBalance) {
    return b.goalsBalance - a.goalsBalance;
  }
  return b.goalsFavor - a.goalsFavor;
});

export default sortListTeamInfo;
