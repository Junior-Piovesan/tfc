import { NextFunction, Request, Response, Router } from 'express';

import TeamsControllers from '../controllers/teams/teams.controllers';
import TeamMiddlaware from '../middlewares/teams/teamMiiddlaware';

const router = Router();

const teamController = new TeamsControllers();
const teamMiddlawares = new TeamMiddlaware();

router.get(
  '/',
  (req:Request, res:Response) => teamController.getAllTeams(req, res),
);

router.get(
  '/:id',
  (req:Request, res:Response, next:NextFunction) =>
    teamMiddlawares.checkTeamExist(req, res, next),

  (req:Request, res:Response) =>
    teamController.getTeamById(req, res),
);

export default router;
