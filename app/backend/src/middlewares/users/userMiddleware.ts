import { Request, Response, NextFunction } from 'express';

import SequelizeUser from '../../database/models/SequelizeUser';

import mapStatusHTTP from '../../utils/mapStatusHTTP';

import { loginSchema } from '../../utils/schemas/userSchema';

import Authentication from '../../utils/validations/authentication';
import { Iuser } from '../../Interfaces/users/Iuser';

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

  public async checkEmailIsValid(req:Request, res:Response, next:NextFunction) {
    const user = req.body;

    const dbUser = await this._model.findOne({ where: { email: user.email } }) as SequelizeUser;

    if (!dbUser) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Invalid email or password' });
    }
    return next();
  }

  static checkTokenExist(req:Request, res:Response, next:NextFunction) {
    const { authorization } = req.headers as { authorization:string };

    if (!authorization) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token not found' });
    }

    const bearerToken = authorization.split(' ');
    const [bearer, token] = bearerToken;

    if (bearer !== 'Bearer' || !token) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Bearer not found' });
    }
    return next();
  }

  static checkTokenIsValid(req:Request, res:Response, next:NextFunction) {
    const { authorization } = req.headers as { authorization:string };

    const bearerToken = authorization.split(' ');
    const [, token] = bearerToken;

    try {
      const decoded = Authentication.checkTokenIsValid(token as string);
      res.locals = decoded as Iuser;
      return next();
    } catch (err) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }
  }
}
