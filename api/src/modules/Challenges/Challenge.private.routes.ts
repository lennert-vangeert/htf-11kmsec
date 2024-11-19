import express from "express";
import {
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from "./Challenge.controller";

const router = express.Router();

router.post("/Challenges", createChallenge);
router.patch("/Challenges/:id", updateChallenge);
router.delete("/Challenges/:id", deleteChallenge);


export default router;
