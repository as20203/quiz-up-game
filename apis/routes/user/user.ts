import { Router } from 'express';
import { addUser, getUser, updateUser, deleteUser } from '~/controllers';
import {
  authenticationHandler,
  checkCategory,
  validateUser,
  checkIfAdmin,
  validateModifiedUser
} from '~/middleware';

export const userRouter = Router();

userRouter.post('/', checkCategory, validateUser, addUser);

userRouter.get('/:id', checkIfAdmin, getUser);

userRouter.delete('/:id', authenticationHandler('jwt'), checkIfAdmin, deleteUser);

userRouter.patch('/:id', checkIfAdmin, validateModifiedUser, updateUser);
