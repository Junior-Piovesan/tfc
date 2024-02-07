import { Request } from 'express';
import SequelizeMatches from '../../database/models/SequelizeMatches';
import MatchesModel from '../../models/MatchesModel';

import { ServiceResponseSuccess } from '../../Interfaces/ServiceResponse';

export default class MatchesService {
  private _matchesModel: MatchesModel;

  constructor(matchesModel = new MatchesModel()) {
    this._matchesModel = matchesModel;
  }

  public async getAllMatches(req:Request):Promise<ServiceResponseSuccess<SequelizeMatches[]>> {
    const { inProgress } = req.query;

    const isInProgress = inProgress === 'true';

    if (inProgress) {
      const matchesList = await this._matchesModel.getMatchesListByQuery(isInProgress);
      console.log('inProgress');
      return { status: 'SUCCESSFUL', data: matchesList };
    }

    const matchesList = await this._matchesModel.getAllMatches();
    console.log('não tem inProgress');

    return { status: 'SUCCESSFUL', data: matchesList };
  }
}
