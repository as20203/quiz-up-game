import { Schema } from 'mongoose';
export const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    addedOn: { type: Date, default: Date.now },
    addedBy: { type: String, required: true, ref: 'User' }
  },
  { versionKey: false }
);
