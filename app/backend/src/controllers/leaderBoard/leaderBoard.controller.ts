import { Request, Response } from 'express';

import mapStatusHTTP from '../../utils/mapStatusHTTP';
import LeaderBoardService from '../../services/leaderBoard/leaderBoard.service';

export default class LeaderBoardController {
  private _leaderBoardService: LeaderBoardService;

  constructor(leaderBoard = new LeaderBoardService()) {
    this._leaderBoardService = leaderBoard;
  }

  public async getLeaderBoard(req:Request, res:Response) {
    const { status, data } = await this._leaderBoardService.getLeaderBoard(req);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
