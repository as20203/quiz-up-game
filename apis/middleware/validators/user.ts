import { FailureMessages, Request, UserController, UserSchemaData } from '~/types';
import { NextFunction, Response } from 'express';
import { failure, validators } from '~/utils';

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

const userEmailValidator = (validationErrors: FailureMessages[], email: string) => {
  const nameValidator = validators.validateEmail(email);
  if (!nameValidator.isValid) {
    validationErrors.push({
      fieldName: 'name',
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
export const validateEmployeeUser = (
  request: Request<UserController>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name, email, password }
    } = request;
    const validationErrors: FailureMessages[] = [];
    userNameValidator(validationErrors, name);
    userEmailValidator(validationErrors, email);
    userPasswordValidator(validationErrors, password);

    const client: UserSchemaData = {
      name,
      email,
      password,
      role: 'admin'
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
export const validateClientUser = (
  request: Request<UserController>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name, email, password }
    } = request;
    const validationErrors: FailureMessages[] = [];
    userNameValidator(validationErrors, name);
    userEmailValidator(validationErrors, email);
    userPasswordValidator(validationErrors, password);

    const client: UserSchemaData = {
      name,
      email,
      password,
      role: 'user'
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

export const validateModifiedUser = (
  request: Request<Partial<UserController>>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name, email, password }
    } = request;
    const client = {} as UserSchemaData;
    const validationErrors: FailureMessages[] = [];
    if (name) {
      const usernameValidator = userNameValidator(validationErrors, name);
      if (usernameValidator) client.name = name;
    }
    if (email) {
      const emailValidator = userEmailValidator(validationErrors, email);
      if (emailValidator) client.email = email;
    }

    if (password) {
      const passwordValidator = userPasswordValidator(validationErrors, password);
      if (passwordValidator) client.password = password;
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
