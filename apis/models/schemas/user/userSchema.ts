import { Schema } from 'mongoose';
import { constants } from '~/utils';
export const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true, ref: 'Company' },
    role: { type: String, required: true, default: 'user', enum: constants.enums.userTypesEnum }
  },
  { versionKey: false }
);
