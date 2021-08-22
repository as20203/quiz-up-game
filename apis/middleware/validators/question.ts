import { FailureMessages, QuestionControlelr, QuestionSchemaData, Request } from '~/types';
import { NextFunction, Response } from 'express';
import { failure, validators } from '~/utils';
import { Category } from 'models/model';

const questionTextValidator = (validationErrors: FailureMessages[], text: string) => {
  const textValidator = validators.validateString(text);
  if (!textValidator.isValid) {
    validationErrors.push({
      fieldName: 'text',
      errorMessage: textValidator.message
    });
    return false;
  }
  return true;
};

const questionChoicesValidator = (validationErrors: FailureMessages[], choices: string[]) => {
  let validator = true;
  choices.forEach(choice => {
    const nameValidator = validators.validateString(choice);
    if (!nameValidator.isValid) {
      validationErrors.push({
        fieldName: 'name',
        errorMessage: nameValidator.message
      });
      validator = false;
    }
  });
  return validator;
};

const questionCategoryIdValidator = async (
  validationErrors: FailureMessages[],
  categoryId: string
) => {
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

const questionAnswerValidator = (validationErrors: FailureMessages[], answer: string) => {
  const answerValidator = validators.validateString(answer);
  if (!answerValidator.isValid) {
    validationErrors.push({
      fieldName: 'answer',
      errorMessage: answerValidator.message
    });
    return false;
  }
  return true;
};

export const validateQuestions = async (
  request: Request<QuestionControlelr>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { text, choices, answer, categoryId },
      user: { _id }
    } = request;
    const validationErrors: FailureMessages[] = [];
    questionTextValidator(validationErrors, text);
    questionChoicesValidator(validationErrors, choices);
    await questionCategoryIdValidator(validationErrors, categoryId);
    questionAnswerValidator(validationErrors, answer);
    const question: QuestionSchemaData = {
      text,
      choices,
      categoryId,
      answer,
      addedBy: _id
    };
    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate question form fields`, 400);
    } else {
      request.question = question;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate question form fields`);
  }
};

export const validateModifiedQuestions = async (
  request: Request<QuestionControlelr>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { text, choices, answer, categoryId }
    } = request;
    const validationErrors: FailureMessages[] = [];
    const question = {} as QuestionSchemaData;
    if (text) {
      const questionText = questionTextValidator(validationErrors, text);
      if (questionText) question.text = text;
    }

    if (Array.isArray(choices) && choices.length > 0) {
      const questionChoices = questionChoicesValidator(validationErrors, choices);
      if (questionChoices) question.choices = choices;
    }

    if (categoryId) {
      const quizCategory = await questionCategoryIdValidator(validationErrors, categoryId);
      if (quizCategory) question.categoryId = categoryId;
    }

    if (answer) {
      const questionAnswer = questionAnswerValidator(validationErrors, answer);
      if (questionAnswer) question.answer = answer;
    }

    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate question form fields`, 400);
    } else {
      request.question = question;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate question form fields`);
  }
};
