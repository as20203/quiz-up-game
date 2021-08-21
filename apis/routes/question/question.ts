import { Router } from 'express';
import {
  addQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion
} from '~/controllers';
import {
  authenticationHandler,
  questionAccess,
  validateQuestions,
  validateModifiedQuestions
} from '~/middleware';

export const questionRouter = Router();

questionRouter.post(
  '/',
  authenticationHandler('jwt'),
  questionAccess,
  validateQuestions,
  addQuestion
);

questionRouter.get('/:id', authenticationHandler('jwt'), questionAccess, getQuestion);
questionRouter.get('/', authenticationHandler('jwt'), questionAccess, getQuestions);

questionRouter.delete('/:id', authenticationHandler('jwt'), questionAccess, deleteQuestion);

questionRouter.patch(
  '/:id',
  authenticationHandler('jwt'),
  questionAccess,
  validateModifiedQuestions,
  updateQuestion
);
