import { Router } from 'express';
import { addQuiz, getQuiz, getQuizzes, deleteQuiz, updateQuiz } from '~/controllers';
import {
  authenticationHandler,
  checkIfAdmin,
  validateModifiedQuiz,
  validateQuiz
} from '~/middleware';

export const quizRouter = Router();

quizRouter.post('/', authenticationHandler('jwt'), validateQuiz, addQuiz);

quizRouter.get('/:id', authenticationHandler('jwt'), checkIfAdmin, getQuiz);
quizRouter.get('/', authenticationHandler('jwt'), getQuizzes);
quizRouter.delete('/:id', authenticationHandler('jwt'), checkIfAdmin, deleteQuiz);

quizRouter.patch(
  '/:id',
  authenticationHandler('jwt'),
  checkIfAdmin,
  validateModifiedQuiz,
  updateQuiz
);
