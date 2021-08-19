import { userSchema, categorySchema } from '~/models';
import { model } from 'mongoose';
import { UserSchema, UserSchemaMethods, CategorySchemaMethods, CategorySchema } from '~/types';

export const User = model<UserSchema, UserSchemaMethods>('User', userSchema);
export const Category = model<CategorySchema, CategorySchemaMethods>('Category', categorySchema);
