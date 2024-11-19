import express from "express";
import { addToScoreboard } from "./Scoreboard.controller";


const router = express.Router();

router.post("/scoreboard", addToScoreboard);

export default router;
