import { LoginInfo, TokenType } from '../../Interfaces/users/Iuser';
import { ServiceResponseSuccess } from '../../Interfaces/ServiceResponse';

import UserModel from '../../models/UsersModel';

export default class UserService {
  private _userModel: UserModel;

  constructor(userModel = new UserModel()) { this._userModel = userModel; }

  public async userLogin(user:LoginInfo):
  Promise<ServiceResponseSuccess<TokenType | null>> {
    const dbUser = await this._userModel.userLogin(user);
    console.log(dbUser);
    return { status: 'SUCCESSFUL', data: { token: 'meu token' } };
  }
}
