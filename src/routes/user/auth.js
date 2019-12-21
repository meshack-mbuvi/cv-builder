import { Router } from 'express';
import { UserController } from '../../controllers/user/auth';

import { signupRequestSchema, loginRequestSchema } from '../../middlewares/';
import { joiValidate } from '../../middlewares/validator/joiValidator';

const router = new Router();

router
  .route('/signup')
  .post(joiValidate('body', signupRequestSchema), UserController.signUp);

router
  .route('/login')
  .post(joiValidate('body', loginRequestSchema), UserController.login);

export default router;
