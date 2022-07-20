import { Router } from 'express';
import AuthContoller from '../controllers/auth/AuthController';
import auth from '../middlewares/auth';

const router: Router = Router();

router.get('/push', AuthContoller.pushAlarm);
router.post('/login/:social', AuthContoller.socialLogin);
router.patch('/logout', auth, AuthContoller.socialLogout);

export default router;
