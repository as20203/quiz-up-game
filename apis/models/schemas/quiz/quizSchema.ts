import { Schema } from 'mongoose';
export const quizSchema = new Schema(
  {
    score: { type: Number, required: true },
    categoryId: { type: String, required: true, ref: 'Category' },
    takenBy: { type: String, required: true, ref: 'User' },
    adddedOn: { type: Date, default: Date.now }
  },
  { versionKey: false }
);
