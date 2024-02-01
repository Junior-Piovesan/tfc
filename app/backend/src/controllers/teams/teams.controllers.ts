import { Response, Request } from 'express';

import mapStatusHTTP from '../../utils/mapStatusHTTP';

import TeamService from '../../services/teams/teams.service';

export default class TeamsControllers {
  private _teamService: TeamService;

  constructor(teamService = new TeamService()) { this._teamService = teamService; }

  public async getAllTeams(_req:Request, res:Response) {
    const { status, data } = await this._teamService.getAllTeams();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getTeamById(req:Request, res:Response) {
    const { id } = req.params;
    const { status, data } = await this._teamService.getTeamById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
