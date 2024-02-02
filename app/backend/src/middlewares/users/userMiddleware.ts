import { Request, Response, NextFunction } from 'express';

import SequelizeUser from '../../database/models/SequelizeUser';

import mapStatusHTTP from '../../utils/mapStatusHTTP';

import { loginSchema } from '../../utils/schemas/userSchema';

import Authentication from '../../utils/validations/authentication';

export default class UserMiddleware {
  private _model = SequelizeUser;

  static async checkInfologinMiddlaware(req:Request, res:Response, next:NextFunction) {
    const user = req.body;

    const { error } = loginSchema.validate(user);

    if (error) return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: error.message });

    return next();
  }

  public async checkPassworIsValid(req:Request, res:Response, next:NextFunction) {
    const user = req.body;

    const dbUser = await this._model.findOne({ where: { email: user.email } }) as SequelizeUser;

    const passwordIsValid = Authentication
      .validatePassword(user, dbUser.dataValues.password);

    if (!passwordIsValid) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Invalid email or password' });
    }

    return next();
  }
}
