import { Router } from 'express';
import { addUser, getUser, updateUser, deleteUser } from '~/controllers';
import {
  authenticationHandler,
  validateUser,
  checkIfAdmin,
  validateModifiedUser
} from '~/middleware';

export const userRouter = Router();

userRouter.post('/', validateUser, addUser);

userRouter.get('/:id', getUser);

userRouter.delete('/:id', authenticationHandler('jwt'), checkIfAdmin, deleteUser);

userRouter.patch('/:id', validateModifiedUser, updateUser);
