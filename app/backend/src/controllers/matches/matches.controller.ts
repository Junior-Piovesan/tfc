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
}
