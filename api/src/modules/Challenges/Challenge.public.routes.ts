import { Router } from "express";
import { getChallengeById, getChallenges} from "./Challenge.controller";
import { getScoreboard, getScoreboardByChallengeId } from "../Scoreboard/Scoreboard.controller";

const router = Router();
router.get("/Challenges", getChallenges);
router.get("/Challenges/:id", getChallengeById);
router.get("/scoreboard", getScoreboard);
router.get("/scoreboard/:id", getScoreboardByChallengeId);

export default router;
