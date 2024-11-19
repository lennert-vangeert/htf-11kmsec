import { NextFunction, Request, Response } from "express";
import Challenge from "./Challenge.model";
import notFoundError from "../../middleware/Error/notFoundError";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";

const getChallenges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Challenge.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const createChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const challenge = new Challenge({ ...req.body, userId: user._id });
    const result = await challenge.save();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
};

const getChallengeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findOne({
      _id: id,
    });
    if (!challenge) {
      throw new notFoundError("Product not found");
    }
    res.json(challenge);
  } catch (err) {
    next(err);
  }
};

const updateChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!challenge) {
      throw new notFoundError("Challenge not found");
    }
    res.json(challenge);
  } catch (err) {
    next(err);
  }
};

const deleteChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const ChallengetoBeDeleted = await Challenge.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!Challenge) {
      throw new notFoundError("Challenge not found");
    }
    res.json({ message: `Challenge with id:${id} has been deleted` });
  } catch (err) {
    next(err);
  }
};

export {
  getChallenges,
  createChallenge,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
};
