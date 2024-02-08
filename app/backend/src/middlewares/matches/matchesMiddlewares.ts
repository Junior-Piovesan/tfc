import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../../utils/mapStatusHTTP';

export default class MatchesMiddlaware {
  static checkHomeTeamAwayTeamDifferent(req:Request, res:Response, next:NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (Number(homeTeamId) === Number(awayTeamId)) {
      return res.status(mapStatusHTTP('UNPROCESSABLE_CONTENT'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  }
}
