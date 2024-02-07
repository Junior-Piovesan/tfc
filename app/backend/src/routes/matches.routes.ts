import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matches/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/?',
  (req:Request, res:Response) => {
    matchesController.getAllMatches(req, res);
  },
);

export default router;
