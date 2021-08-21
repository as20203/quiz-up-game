import { userSchema, categorySchema, questionSchema } from '~/models';
import { model } from 'mongoose';
import {
  UserSchema,
  UserSchemaMethods,
  CategorySchemaMethods,
  CategorySchema,
  QuestionSchema,
  QuestionSchemaMethods
} from '~/types';

export const User = model<UserSchema, UserSchemaMethods>('User', userSchema);
export const Category = model<CategorySchema, CategorySchemaMethods>('Category', categorySchema);
export const Question = model<QuestionSchema, QuestionSchemaMethods>('Quiz', questionSchema);
