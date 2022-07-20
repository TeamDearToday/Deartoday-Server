import { Router } from 'express';
import AuthContoller from '../controllers/auth/AuthController';
import auth from '../middlewares/auth';

const router: Router = Router();

router.post('/login/:social', AuthContoller.socialLogin);
router.patch('/logout', auth, AuthContoller.socialLogout);

// 지울 코드
router.get('/push', AuthContoller.pushAlarm);

export default router;
