import GenerateTeamsInfo from '../../utils/generateTeamsInfo';

import { ServiceResponse } from '../../Interfaces/ServiceResponse';

import MatchesModel from '../../models/MatchesModel';
import { TeamInfo } from '../../Interfaces/teams/Iteams';

export default class LeaderBoardService {
  private _matchesModel: MatchesModel;

  constructor(matchesModel = new MatchesModel()) {
    this._matchesModel = matchesModel;
  }

  public async getLeaderBoard():Promise<ServiceResponse<TeamInfo[]>> {
    const dbAllMatches = await this._matchesModel.getAllMatches();

    const listTeamsInfo = GenerateTeamsInfo.generateInfo(dbAllMatches as unknown as MatchesModel[]);

    const listOrdened = listTeamsInfo.sort((a, b) => {
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

    return { status: 'SUCCESSFUL', data: listOrdened };
  }
}
