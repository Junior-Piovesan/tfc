import { Response, Request } from 'express';

import mapStatusHTTP from '../../utils/mapStatusHTTP';

import MatchesService from '../../services/matches/matches.service';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor(matchesService = new MatchesService()) {
    this._matchesService = matchesService;
  }

  public async getAllMatches(_req:Request, res:Response) {
    const { status, data } = await this._matchesService.getAllMatches();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
