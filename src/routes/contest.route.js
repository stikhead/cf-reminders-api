import { Router } from "express";
import { contest } from "../controllers/contest.controller.js";

const router = Router();

router.route('/contest').get(contest);

export default router