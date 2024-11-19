import { Router } from "express";
import { getChallengeById, getChallenges} from "./Challenge.controller";

const router = Router();
router.get("/Challenges", getChallenges);
router.get("/Challenges/:id", getChallengeById);

export default router;
