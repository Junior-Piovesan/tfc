import { Router } from 'express';

import teamsRouter from './teams.routes';
import userRouter from './user.routes';
import matchesRouter from './matches.routes';
import leaderBoard from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', userRouter);

router.use('/matches', matchesRouter);

router.use('/leaderboard', leaderBoard);

export default router;
