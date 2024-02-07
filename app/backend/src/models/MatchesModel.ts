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

  public async getMatchesListByQuery(inProgress: boolean):Promise<SequelizeMatches[]> {
    const dbMatchesList = await this._model.findAll({ ...includeTable, where: { inProgress } });

    return dbMatchesList;
  }

  public async editMatchesStatus(id:number, inProgress = false) {
    const finishMatches = await this._model
      .update({ inProgress }, { where: { id } });

    console.log(finishMatches);

    return finishMatches;
  }
}
