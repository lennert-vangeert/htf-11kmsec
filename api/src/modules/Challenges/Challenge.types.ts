import { Document, ObjectId } from "mongoose";

export type Challenge = Document & {
  _id?: string;
  name: string;
  description: string;
  image: string;
  difficulty: string;
  category: string;
  tags: string[];
  path: string;
};
