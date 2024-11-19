import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Challenge } from "./Challenge.types";

const challengeSchema = new mongoose.Schema<Challenge>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Physical", "Mental", "puzzle", "riddle"],
      required: true,
    },
    tags: {
      type: [String],
      enum: ["running", "reaction time", "language", "trivia", "math", "coordination", "tactics", "strategy", "memory", "focus", "attention", "problem solving", "creativity", "critical thinking", "spatial awareness", "pattern recognition", "observation", "deduction", "reasoning", "logic", "analysis", "decision making"],
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

//date format
// YYYY-MM-DD

challengeSchema.pre("save", function (next) {
  validateModel(this);
  next();
});


const Challengemodel = mongoose.model<Challenge>("Challenge", challengeSchema);

export default Challengemodel;
