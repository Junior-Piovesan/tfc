import Jwt = require('jsonwebtoken');
import bycript = require('bcryptjs');

import { Iuser, LoginInfo } from '../../Interfaces/users/Iuser';

export default class Authentication {
  static createToken(user:Iuser):string {
    const { id, email, role, username } = user;

    const secret = process.env.JWT_SECRET || 'jwt_secret';

    const token = Jwt.sign({ data: { id, username, email, role } }, secret);

    return token;
  }

  static validatePassword(user: LoginInfo, hash:string):boolean {
    const passwordIsCorrect = bycript.compareSync(user.password, hash);

    return passwordIsCorrect;
  }
}
