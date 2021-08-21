import { Router } from 'express';
import { addUser, getUser, updateUser, deleteUser, getUsers } from '~/controllers';
import {
  authenticationHandler,
  checkCategory,
  validateUser,
  checkIfAdmin,
  validateModifiedUser
} from '~/middleware';

export const userRouter = Router();

userRouter.post('/', checkCategory, validateUser, addUser);
userRouter.get('/', authenticationHandler('jwt'), checkIfAdmin, getUsers);

userRouter.get('/:id', authenticationHandler('jwt'), checkIfAdmin, getUser);

userRouter.delete('/:id', authenticationHandler('jwt'), checkIfAdmin, deleteUser);

userRouter.patch(
  '/:id',
  authenticationHandler('jwt'),
  checkIfAdmin,
  validateModifiedUser,
  updateUser
);
