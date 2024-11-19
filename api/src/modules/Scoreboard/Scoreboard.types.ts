import { Document, ObjectId } from "mongoose";

export type Scoreboard = Document & {
  _id?: string;
  userId: ObjectId;
  challengeId: ObjectId;
  score: number;
};
