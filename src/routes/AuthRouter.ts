import { Router } from 'express';
import AuthContoller from '../controllers/auth/AuthController';

const router: Router = Router();

router.post('/login/:social', AuthContoller.socialLogin);
router.patch('/logout');

export default router;
