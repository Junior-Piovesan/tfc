import { Iteam } from '../Interfaces/teams/Iteams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

import TeamModel from '../models/TeamsModels';

export default class TeamService {
  private _teamModel;

  constructor(teamModel = new TeamModel()) { this._teamModel = teamModel; }

  public async getAllTeams():Promise<ServiceResponse<Iteam[]>> {
    const teamsList = await this._teamModel.getAll();

    return { status: 'SUCCESSFUL', data: teamsList };
  }

  public async getTeamById(id:Iteam['id']): Promise<ServiceResponse<Iteam>> {
    const team = await this._teamModel.getTeamById(id);

    if (!team) return { status: 'INVALID_DATA', data: { message: 'Time não encontrado' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
