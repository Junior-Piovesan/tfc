import { Router } from 'express';

import teamsRouters from './teams.routes';

const router = Router();

router.use('/teams', teamsRouters);

export default router;
