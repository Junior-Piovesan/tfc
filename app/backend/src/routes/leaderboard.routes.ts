import { Router, Response, Request } from 'express';

import LeaderBoardController from '../controllers/leaderBoard/leaderBoard.controller';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/',
  (req:Request, res:Response) => leaderBoardController.getLeaderBoard(req, res),
);

router.get(
  '/home',
  (req:Request, res:Response) => leaderBoardController.getLeaderBoard(req, res),
);

router.get(
  '/away',
  (req:Request, res:Response) => leaderBoardController.getLeaderBoard(req, res),
);

export default router;
