import { Schema } from 'mongoose';
import { constants } from '~/utils';
export const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true, default: 'user', enum: constants.enums.userTypesEnum }
  },
  { versionKey: false }
);
