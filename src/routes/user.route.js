import { Router } from "express";
import { registerUser, verifyUser } from "../controllers/user.controller.js";
import { authRateLimit } from "../middleware/rateLimit.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/verify').get(authRateLimit, verifyUser);


export default router