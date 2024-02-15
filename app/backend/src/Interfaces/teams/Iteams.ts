export interface Iteam {
  id: number,
  teamName: string,
}

export type TeamInfo = {
  name:string,
  totalPoints:number,
  totalGames:number,
  totalVictories:number,
  totalDraws:number,
  totalLosses:number,
  goalsFavor:number,
  goalsOwn:number,
  goalsBalance:number,
  efficiency:string
};
