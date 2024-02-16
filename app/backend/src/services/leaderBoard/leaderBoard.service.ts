import { Request } from 'express';

import sortListTeamInfo from '../../utils/sortListTeamInfo';
import GenerateTeamsInfo from '../../utils/generateTeamsInfo';

import { ServiceResponse } from '../../Interfaces/ServiceResponse';

import MatchesModel from '../../models/MatchesModel';
import { TeamInfo } from '../../Interfaces/teams/Iteams';

export default class LeaderBoardService {
  private _matchesModel: MatchesModel;

  constructor(matchesModel = new MatchesModel()) {
    this._matchesModel = matchesModel;
  }

  public async getLeaderBoard(req:Request):Promise<ServiceResponse<TeamInfo[]>> {
    const { path } = req;
    const dbAllMatches = await this._matchesModel.getAllMatches();

    if (path === '/') {
      const homeInfo = GenerateTeamsInfo.generateInfo(dbAllMatches, '/home');
      const awayInfo = GenerateTeamsInfo.generateInfo(dbAllMatches, '/away');

      const listTeamGeralInfo = GenerateTeamsInfo.geralTeamsInfo(homeInfo, awayInfo);

      const listOrdened = sortListTeamInfo(listTeamGeralInfo);

      return { status: 'SUCCESSFUL', data: listOrdened };
    }

    const listTeamsInfo = GenerateTeamsInfo
      .generateInfo(dbAllMatches as unknown as MatchesModel[], path);

    const listOrdened = sortListTeamInfo(listTeamsInfo);

    return { status: 'SUCCESSFUL', data: listOrdened };
  }
}
