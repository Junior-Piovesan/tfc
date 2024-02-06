import SequelizeMatches from '../../database/models/SequelizeMatches';
import { ServiceResponseSuccess } from '../../Interfaces/ServiceResponse';
// import { MatchesResponse } from '../../Interfaces/matches/Imatches';
import MatchesModel from '../../models/MatchesModel';

export default class MatchesService {
  private _matchesModel: MatchesModel;

  constructor(matchesModel = new MatchesModel()) {
    this._matchesModel = matchesModel;
  }

  public async getAllMatches():Promise<ServiceResponseSuccess<SequelizeMatches[]>> {
    const matchesList = await this._matchesModel.getAllMatches();

    return { status: 'SUCCESSFUL', data: matchesList };
  }
}
