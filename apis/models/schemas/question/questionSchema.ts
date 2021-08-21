import { Schema } from 'mongoose';
export const questionSchema = new Schema(
  {
    text: { type: String, required: true },
    choices: [{ type: String, required: true }],
    answer: { type: String, required: true },
    categoryId: { type: String, required: true, ref: 'Category' },
    addedBy: { type: String, required: true, ref: 'User' },
    adddedOn: { type: Date, default: Date.now }
  },
  { versionKey: false }
);
