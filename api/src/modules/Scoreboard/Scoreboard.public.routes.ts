import { Router } from "express";
import {
  getScoreboardByChallengeId,
  getScoreboard,
} from "./Scoreboard.controller";

const router = Router();
router.get("/scoreboard", getScoreboard);
router.get("/scoreboard/:id", getScoreboardByChallengeId);

export default router;
