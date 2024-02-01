import { NextFunction, Request, Response } from 'express';
import SequelizeTeam from '../../database/models/SequelizeTeam';
import mapStatusHTTP from '../../utils/mapStatusHTTP';

export default class TeamMiddlaware {
  private _model = SequelizeTeam;

  async checkTeamExist(req:Request, res:Response, next:NextFunction) {
    const { id } = req.params;
    const team = await this._model.findByPk(Number(id));

    if (!team) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'Time não encontrado' });
    }

    return next();
  }
}
