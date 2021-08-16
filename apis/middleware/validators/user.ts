import { FailureMessages, Request, UserCategory, UserController, UserSchemaData } from '~/types';
import { NextFunction, Response } from 'express';
import { failure, validators, constants, generateHash } from '~/utils';

const userNameValidator = (validationErrors: FailureMessages[], name: string) => {
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

const usernameValidator = (validationErrors: FailureMessages[], username: string) => {
  const nameValidator = validators.validateString(username);
  if (!nameValidator.isValid) {
    validationErrors.push({
      fieldName: 'username',
      errorMessage: nameValidator.message
    });
    return false;
  }
  return true;
};

const userPasswordValidator = (validationErrors: FailureMessages[], password: string) => {
  const passwordValidator = validators.validatePassword(password);
  if (!passwordValidator.isValid) {
    validationErrors.push({
      fieldName: 'password',
      errorMessage: passwordValidator.message
    });
    return false;
  }
  return true;
};

const userCategoryValidator = (validationErrors: FailureMessages[], role: UserCategory) => {
  const categoryValidator = validators.validateFromEnum(role, constants.enums.userTypesEnum);
  if (!categoryValidator.isValid) {
    validationErrors.push({
      fieldName: 'category',
      errorMessage: categoryValidator.message
    });
    return false;
  }
  return true;
};
export const validateUser = async (
  request: Request<UserController>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name, username, password, category }
    } = request;
    const validationErrors: FailureMessages[] = [];
    userNameValidator(validationErrors, name);
    usernameValidator(validationErrors, username);
    userPasswordValidator(validationErrors, password);
    userCategoryValidator(validationErrors, category);
    const hashedPassword = await generateHash(password);

    const client: UserSchemaData = {
      name,
      username,
      password: hashedPassword,
      category
    };
    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate user form fields`, 400);
    } else {
      request.client = client;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate user form fields`);
  }
};

export const validateModifiedUser = async (
  request: Request<Partial<UserController>>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name, username, password, category }
    } = request;
    const client = {} as UserSchemaData;
    const validationErrors: FailureMessages[] = [];
    if (name) {
      const usernameValidator = userNameValidator(validationErrors, name);
      if (usernameValidator) client.name = name;
    }
    if (username) {
      const emailValidator = usernameValidator(validationErrors, username);
      if (emailValidator) client.username = username;
    }

    if (password) {
      const passwordValidator = userPasswordValidator(validationErrors, password);
      if (passwordValidator) client.password = await generateHash(password);
    }

    if (category) {
      const categoryValidator = userCategoryValidator(validationErrors, category);
      if (categoryValidator) client.category = category;
    }

    if (validationErrors.length > 0) {
      return failure(response, validationErrors, `Couldn't validate user form fields`, 400);
    } else {
      request.client = client;
      return next();
    }
  } catch (error) {
    return failure(response, error.message, `Couldn't validate user form fields`);
  }
};
