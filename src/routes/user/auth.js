import { Router } from "express";
import { UserController } from "../../controllers/user/auth";

import { signupRequestSchema } from "../../middlewares/";
import { joiValidate } from "../../middlewares/validator/joiValidator";

const router = new Router();
router
  .route("/signup")
  .post(joiValidate("body", signupRequestSchema), UserController.signUp);

export default router;
