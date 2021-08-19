import {
  CategoryController,
  CategorySchemaData,
  FailureMessages,
  Request,
  UserController
} from '~/types';
import { NextFunction, Response } from 'express';
import { failure, validators } from '~/utils';

const categoryNameValidator = (validationErrors: FailureMessages[], name: string) => {
  const nameValidator = validators.validateString(name);
  if (!nameValidator.isValid) {
    validationErrors.push({
      fieldName: 'name',
      errorMessage: nameValidator.message
    });
    return false;
  }
  return true;
};

export const validateCategory = async (
  request: Request<CategoryController>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name },
      user: { _id }
    } = request;
    const validationErrors: FailureMessages[] = [];
    categoryNameValidator(validationErrors, name);

    const category: CategorySchemaData = {
      name,
      addedBy: _id
    };
    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate user form fields`, 400);
    } else {
      request.category = category;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate user form fields`);
  }
};

export const validateModifiedCategory = async (
  request: Request<Partial<UserController>>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name }
    } = request;
    const category = {} as CategorySchemaData;
    const validationErrors: FailureMessages[] = [];
    if (name) {
      const categoryName = categoryNameValidator(validationErrors, name);
      if (categoryName) category.name = name;
    }

    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate user form fields`, 400);
    } else {
      request.category = category;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate user form fields`);
  }
};
