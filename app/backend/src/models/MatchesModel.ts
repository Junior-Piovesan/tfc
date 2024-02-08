import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';

import { TeamsGoalsReq } from '../Interfaces/matches/Imatches';

import sequelize from '../database/models';

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

  public async updateMatcheGoals(goals: TeamsGoalsReq, id: number):Promise<number> {
    const t = await sequelize.transaction();
    try {
      const [[updateMatchGoals]] = await Promise.all([goals].map(async (goal) => {
        const updateGoals = await this._model
          .update({
            homeTeamGoals: goal.homeTeamGoals,
            awayTeamGoals: goal.awayTeamGoals,
          }, { where: { id }, transaction: t });

        await t.commit();

        return updateGoals;
      }));

      return updateMatchGoals;
    } catch (error) {
      await t.rollback();
      throw new Error('Error when updating match goals');
    }
  }

  public async createMatche(metcheRequest:SequelizeMatches):Promise<SequelizeMatches> {
    const newMatche = await this._model
      .create({
        ...metcheRequest,
        inProgress: true,
      });

    return newMatche;
  }
}
