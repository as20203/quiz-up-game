import { userSchema } from '~/models';
import { model } from 'mongoose';
import { UserSchema, UserSchemaMethods } from '~/types';

export const User = model<UserSchema, UserSchemaMethods>('User', userSchema);
