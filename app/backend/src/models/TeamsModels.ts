import SequelizeTeam from '../database/models/SequelizeTeam';
import { Iteam } from '../Interfaces/teams/Iteams';
import IteamModel from '../Interfaces/teams/IteamsModel';

export default class TeamModel implements IteamModel {
  private _model = SequelizeTeam;

  async getAll():Promise<Iteam[]> {
    const dbTeams = await this._model.findAll();

    return dbTeams.map(({ id, teamName }) => ({ id, teamName })) as Iteam[];
  }
}
