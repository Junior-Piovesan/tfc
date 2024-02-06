import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';

const includeTable = { include: [
  { model: SequelizeTeam,
    as: 'homeTeam',
    attributes: { exclude: ['id'] },
  },
  { model: SequelizeTeam,
    as: 'awayTeam',
    attributes: { exclude: ['id'] },
  }] };

export default class MatchesModel {
  private _model = SequelizeMatches;

  public async getAllMatches():Promise<SequelizeMatches[]> {
    const dbMatchesList = await this._model
      .findAll(
        includeTable,
      );

    return dbMatchesList;
  }
}
