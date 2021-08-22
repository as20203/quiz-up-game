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

export interface QuestionSchema extends Document {
  text: string;
  choices: string[];
  answer: string;
  categoryId: string;
  addedBy: string;
}

export interface QuizSchema extends Document {
  score: number;
  categoryId: string;
  takenBy: string;
  adddedOn: string;
}
