import { Response, Request } from 'express';

import mapStatusHTTP from '../../utils/mapStatusHTTP';

import MatchesService from '../../services/matches/matches.service';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor(matchesService = new MatchesService()) {
    this._matchesService = matchesService;
  }

  public async getAllMatches(req:Request, res:Response) {
    const { status, data } = await this._matchesService.getAllMatches(req);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async editMatchesStatus(req:Request, res:Response) {
    const { status, data } = await this._matchesService.editMatchesStatus(req);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatcheGoals(req:Request, res:Response) {
    const { status } = await this._matchesService.updateMatcheGoals(req);

    return res.status(mapStatusHTTP(status)).json({ message: 'Updated goals' });
  }

  public async createMatche(req:Request, res:Response) {
    const { status, data } = await this._matchesService.createMatche(req);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
