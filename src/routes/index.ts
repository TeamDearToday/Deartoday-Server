import { Router } from 'express';
import TimeTravelRouter from './TimeTravelRouter';
import AuthRouter from './AuthRouter';

const router: Router = Router();

router.use('/timetravel', TimeTravelRouter);
router.use('/auth', AuthRouter);

export default router;
