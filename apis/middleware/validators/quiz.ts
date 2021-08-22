import { FailureMessages, QuizController, QuizSchemaData, Request } from '~/types';
import { NextFunction, Response } from 'express';
import { failure, validators } from '~/utils';
import { Category } from '~/models';

const quizCategoryIdValidator = async (validationErrors: FailureMessages[], categoryId: string) => {
  const categoryIdValidator = await Category.getCategory(categoryId);
  if (!categoryIdValidator.isExecuted) {
    validationErrors.push({
      fieldName: 'categoryId',
      errorMessage: categoryIdValidator.message
    });
    return false;
  }
  return true;
};

const quizScoreValidator = (validationErrors: FailureMessages[], score: number) => {
  const quizScoreValidator = validators.validateNumber(score);
  if (!quizScoreValidator.isValid) {
    validationErrors.push({
      fieldName: 'score',
      errorMessage: quizScoreValidator.message
    });
    return false;
  }
  return true;
};

export const validateQuiz = async (
  request: Request<QuizController>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { categoryId, score },
      user: { _id }
    } = request;
    const validationErrors: FailureMessages[] = [];
    await quizCategoryIdValidator(validationErrors, categoryId);
    quizScoreValidator(validationErrors, score);
    const quiz: QuizSchemaData = {
      categoryId,
      takenBy: _id,
      score
    };
    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate user form fields`, 400);
    } else {
      request.quiz = quiz;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate user form fields`);
  }
};

export const validateModifiedQuiz = async (
  request: Request<Partial<QuizController>>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { categoryId, score }
    } = request;
    const validationErrors: FailureMessages[] = [];
    const quiz = {} as QuizSchemaData;
    if (categoryId) {
      const quizCategory = await quizCategoryIdValidator(validationErrors, categoryId);
      if (quizCategory) quiz.categoryId = categoryId;
    }
    if (score) {
      const quizScore = quizScoreValidator(validationErrors, score);
      if (quizScore) quiz.score = score;
    }

    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate user form fields`, 400);
    } else {
      request.quiz = quiz;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate user form fields`);
  }
};
