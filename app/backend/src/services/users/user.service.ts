import { Iuser, LoginInfo, TokenType } from '../../Interfaces/users/Iuser';
import { ServiceResponseSuccess } from '../../Interfaces/ServiceResponse';

import UserModel from '../../models/UsersModel';
import Authentication from '../../utils/validations/authentication';

export default class UserService {
  private _userModel: UserModel;

  constructor(userModel = new UserModel()) { this._userModel = userModel; }

  public async userLogin(user:LoginInfo):
  Promise<ServiceResponseSuccess<TokenType | null>> {
    const dbUser = await this._userModel.userLogin(user);

    const token = Authentication.createToken(dbUser as Iuser);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  // public async getUserType():promise<UserType> {
  //   return { role: 'xablau' };
  // }
}
