import { Router, Request, Response, NextFunction } from 'express';

import UserMiddleware from '../middlewares/users/userMiddleware';
import MatchesController from '../controllers/matches/matches.controller';
import MatchesMiddlaware from '../middlewares/matches/matchesMiddlewares';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/?',
  (req:Request, res:Response) => {
    matchesController.getAllMatches(req, res);
  },
);

router.patch(
  '/:id/finish',
  (req:Request, res:Response, next:NextFunction) => UserMiddleware.checkTokenExist(req, res, next),
  (req:Request, res:Response, next:NextFunction) => UserMiddleware
    .checkTokenIsValid(req, res, next),
  (req:Request, res:Response) => matchesController.editMatchesStatus(req, res),
);

router.patch(
  '/:id',
  (req:Request, res:Response, next:NextFunction) => UserMiddleware.checkTokenExist(req, res, next),
  (req:Request, res:Response, next:NextFunction) => UserMiddleware
    .checkTokenIsValid(req, res, next),
  (req:Request, res:Response) => matchesController.updateMatcheGoals(req, res),
);

router.post(
  '/',
  (req:Request, res:Response, next:NextFunction) => UserMiddleware.checkTokenExist(req, res, next),
  (req:Request, res:Response, next:NextFunction) => UserMiddleware
    .checkTokenIsValid(req, res, next),
  (req:Request, res:Response, next:NextFunction) => MatchesMiddlaware
    .checkHomeTeamAwayTeamDifferent(req, res, next),
  (req:Request, res:Response) => matchesController
    .createMatche(req, res),
);

export default router;
