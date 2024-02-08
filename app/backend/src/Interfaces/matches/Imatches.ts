export interface Imatches {
  id:number,
  homeTeamId:number,
  homeTeamGoals:number,
  awayTeamId:number,
  awayTeamGoals:number,
  inProgress:boolean,
}

export type MatchesResponse = {
  id:number,
  homeTeamId:number,
  homeTeamGoals:number,
  awayTeamId:number,
  awayTeamGoals:number,
  inProgress:boolean,
  homeTeam: {
    teamName:string
  },
  awayTeam: {
    teamName:string
  }

};

export type TeamsGoalsReq = { homeTeamGoals:number,
  awayTeamGoals: number };

export type MatcheRequest = {
  homeTeamId:number,
  awayTeamId:number,
  homeTeamGoals:number,
  awayTeamGoals:number
};

export type NewMatche = {
  id:number,
  homeTeamId: number,
  homeTeamGoals:number,
  awayTeamId:number,
  awayTeamGoals:number,
  inProgress:boolean,
};
