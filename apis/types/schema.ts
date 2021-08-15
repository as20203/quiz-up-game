import { Document } from 'mongoose';
import { Role } from '~/types';

export interface UserSchema extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}
