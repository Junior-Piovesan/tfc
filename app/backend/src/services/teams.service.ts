import { Iteam } from '../Interfaces/teams/Iteams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IteamModel from '../Interfaces/teams/IteamsModel';

import TeamModel from '../models/TeamsModels';

export default class TeamService {
  private _teamModel:IteamModel;

  constructor(teamModel: IteamModel = new TeamModel()) { this._teamModel = teamModel; }

  public async getAllTeams():Promise<ServiceResponse<Iteam[]>> {
    const teamsList = await this._teamModel.getAll();

    return { status: 'SUCCESSFUL', data: teamsList };
  }
}
