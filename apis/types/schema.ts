import { Document } from 'mongoose';
import { UserCategory } from '~/types';

export interface UserSchema extends Document {
  name: string;
  username: string;
  password: string;
  category: UserCategory;
}

export interface CategorySchema extends Document {
  name: string;
  addedOn: Date;
  addedBy: string;
}
