import SequelizeUser from '../database/models/SequelizeUser';

import { Iuser, LoginInfo } from '../Interfaces/users/Iuser';

export default class UserModel {
  private _model = SequelizeUser;

  public async userLogin(user:LoginInfo):Promise<Iuser | null> {
    const { email } = user;

    const dbUser = await this._model.findOne({ where: { email } });

    if (!dbUser) return null;

    return dbUser.dataValues as Iuser;
  }
}
