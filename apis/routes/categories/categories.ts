import { Router } from 'express';
import {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getCategories
} from '~/controllers';
import {
  authenticationHandler,
  validateModifiedCategory,
  checkIfAdmin,
  validateCategory
} from '~/middleware';

export const categoryRouter = Router();

categoryRouter.post('/', authenticationHandler('jwt'), checkIfAdmin, validateCategory, addCategory);

categoryRouter.get('/:id', authenticationHandler('jwt'), checkIfAdmin, getCategory);
categoryRouter.get('/', authenticationHandler('jwt'), checkIfAdmin, getCategories);

categoryRouter.delete('/:id', authenticationHandler('jwt'), checkIfAdmin, deleteCategory);

categoryRouter.patch(
  '/:id',
  authenticationHandler('jwt'),
  checkIfAdmin,
  validateModifiedCategory,
  updateCategory
);
