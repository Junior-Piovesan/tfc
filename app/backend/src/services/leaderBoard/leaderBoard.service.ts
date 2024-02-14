import GenerateTeamsInfo from '../../utils/generateTeamsInfo';

import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { NewMatche } from '../../Interfaces/matches/Imatches';

import MatchesModel from '../../models/MatchesModel';

const xablau = (matches:any[]) => matches.map(({ dataValues }) => ({
  id: dataValues.id,
  homeTeamId: dataValues.homeTeamId,
  homeTeamGoals: dataValues.homeTeamGoals,
  awayTeamId: dataValues.awayTeamId,
  awayTeamGoals: dataValues.awayTeamGoals,
  inProgress: dataValues.inProgress,
  homeTeam: dataValues.homeTeam.dataValues,
  awayTeam: dataValues.awayTeam.dataValues,
}) as unknown as NewMatche);

export default class LeaderBoardService {
  private _matchesModel: MatchesModel;

  constructor(matchesModel = new MatchesModel()) {
    this._matchesModel = matchesModel;
  }

  public async getLeaderBoard():Promise<ServiceResponse<any[]>> {
    const dbAllMatches = await this._matchesModel.getAllMatches();
    const newMatchesList = xablau(dbAllMatches);

    const listTeamsInfo = GenerateTeamsInfo.generateInfo(newMatchesList);

    return { status: 'SUCCESSFUL', data: listTeamsInfo };
  }
}
