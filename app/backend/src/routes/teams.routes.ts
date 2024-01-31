import { Request, Response, Router } from 'express';

import TeamsControllers from '../controllers/teams.controllers';

const router = Router();

const teamController = new TeamsControllers();

router.get(
  '/',
  (req:Request, res:Response) => teamController.getAllTeams(req, res),
);

router.get(
  '/:id',
  (req:Request, res:Response) => teamController.getTeamById(req, res),
);

export default router;
