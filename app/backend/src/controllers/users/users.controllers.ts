import { Request, Response } from 'express';

import mapStatusHTTP from '../../utils/mapStatusHTTP';

import UserService from '../../services/users/user.service';
import { Iuser } from '../../Interfaces/users/Iuser';

export default class UserController {
  private _userService: UserService;

  constructor(userService = new UserService()) { this._userService = userService; }

  public async userLogin(req:Request, res:Response) {
    const user = req.body;

    const { status, data } = await this._userService.userLogin(user);

    res.status(mapStatusHTTP(status)).json(data);
  }

  static getUserRole(req:Request, res:Response) {
    const user = res.locals as Iuser;

    const { status, data } = UserService.getUserRole(user);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
