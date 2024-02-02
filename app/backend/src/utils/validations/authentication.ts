import Jwt = require('jsonwebtoken');
import bycript = require('bcryptjs');

import { JwtPayload } from 'jsonwebtoken';
import { Iuser, LoginInfo } from '../../Interfaces/users/Iuser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class Authentication {
  static createToken(user:Iuser):string {
    const { id, email, role, username } = user;

    const token = Jwt.sign({ data: { id, username, email, role } }, secret);

    return token;
  }

  static validatePassword(user: LoginInfo, hash:string):boolean {
    const passwordIsCorrect = bycript.compareSync(user.password, hash);

    return passwordIsCorrect;
  }

  static checkTokenIsValid(token:string):Iuser | null {
    const decoded = Jwt.verify(token, secret) as JwtPayload;

    if (!decoded) return null;

    return decoded.data;
  }
}
