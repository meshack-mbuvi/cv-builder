import { Router } from 'express';
import { EmploymentController } from '../../controllers/cv/employment';

import { employmentRequestSchema } from '../../middlewares/';
import { joiValidate } from '../../middlewares/validator/joiValidator';

const router = new Router();

router
  .route('/new')
  .post(joiValidate('body', employmentRequestSchema), EmploymentController.new);

export default router;
