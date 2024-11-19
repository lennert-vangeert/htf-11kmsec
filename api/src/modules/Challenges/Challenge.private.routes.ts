import express from "express";
import {
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from "./Challenge.controller";
import { addToScoreboard } from "../Scoreboard/Scoreboard.controller";

const router = express.Router();

router.post("/Challenges", createChallenge);
router.patch("/Challenges/:id", updateChallenge);
router.delete("/Challenges/:id", deleteChallenge);
router.post("/scoreboard", addToScoreboard);


export default router;
