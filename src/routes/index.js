import { Router } from "express";
import userRoutes from "./user/auth";
const router = new Router();

router.use("/users", userRoutes);

export default router;
