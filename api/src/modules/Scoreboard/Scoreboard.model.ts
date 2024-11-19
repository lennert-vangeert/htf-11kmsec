import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Scoreboard } from "./Scoreboard.types";

const scoreBoardSchema = new mongoose.Schema<Scoreboard>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Challenge",
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//date format
// YYYY-MM-DD

scoreBoardSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const ScoreBoardModel = mongoose.model<Scoreboard>("Scoreboard", scoreBoardSchema);

export default ScoreBoardModel;
