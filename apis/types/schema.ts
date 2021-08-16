import { Document } from 'mongoose';
import { UserCategory } from '~/types';

export interface UserSchema extends Document {
  name: string;
  username: string;
  password: string;
  category: UserCategory;
}
