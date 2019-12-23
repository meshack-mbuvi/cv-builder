import { Router } from 'express';
import userRoutes from './user/auth';
import employmentRoutes from './employment';
import { authenticate } from '../middlewares';

const router = new Router();

router.use('/users', userRoutes);
router.use('/employments', authenticate, employmentRoutes);

export default router;
