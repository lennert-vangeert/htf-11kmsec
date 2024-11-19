import { NextFunction, Request, Response } from "express";
import notFoundError from "../../middleware/Error/notFoundError";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";
import ScoreBoard from "./Scoreboard.model";

const getScoreboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scoreBoard = await ScoreBoard.find().sort({ createdAt: -1 });
    res.json(scoreBoard);
  } catch (err) {
    next(err);
  }
};

const addToScoreboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const score = new ScoreBoard({ ...req.body, userId: user._id });
    const result = await score.save();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
};

const getScoreboardByChallengeId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //get scores with that challenge ID
    const scoreBoard = await ScoreBoard.find({
      challengeId: id,
    });
    if (!scoreBoard) {
      throw new notFoundError("Scoreboard not found");
    }
    res.json(scoreBoard);
  } catch (err) {
    next(err);
  }
};

export { getScoreboard, addToScoreboard, getScoreboardByChallengeId };
