import SequelizeTeam from '../database/models/SequelizeTeam';
import { Iteam } from '../Interfaces/teams/Iteams';

export default class TeamModel {
  private _model = SequelizeTeam;

  public async getAll():Promise<Iteam[]> {
    const dbTeams = await this._model.findAll();

    return dbTeams.map(({ id, teamName }) => ({ id, teamName })) as Iteam[];
  }

  public async getTeamById(id:Iteam['id']):Promise<Iteam | null> {
    const dbTeam = await this._model.findByPk(id);

    if (dbTeam === null) return null;

    return dbTeam.dataValues as Iteam;
  }
}
