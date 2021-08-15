import { validatorSuccessResponse, validatorFailureResponse, constants } from '~/utils';
import { InputValidator } from '~/types';
const {
  emptyPassword,
  whitespacePassword,
  invalidPasswordLength,
  invalidEmail,
  valueNotInEnum,
  ParsingError
} = constants.messages;
export const validators: InputValidator = {
  validatePassword(password: string) {
    password = String(password);
    if (!password) {
      return validatorFailureResponse(emptyPassword);
    } else if (password.includes(' ')) {
      return validatorFailureResponse(whitespacePassword);
    } else if (password.length > 20 || password.length < 8) {
      return validatorFailureResponse(invalidPasswordLength);
    } else {
      return validatorSuccessResponse();
    }
  },

  validateEmail(email: string) {
    if (!email) {
      return validatorFailureResponse(invalidEmail);
    } else {
      return validatorSuccessResponse();
    }
  },
  validateFromEnum(value, valuesEnum) {
    if (!value || !valuesEnum.includes(value)) {
      return validatorFailureResponse(valueNotInEnum);
    } else {
      return validatorSuccessResponse();
    }
  },

  validateParsing(data) {
    try {
      JSON.parse(data);
      return validatorSuccessResponse();
    } catch (error) {
      return validatorFailureResponse(ParsingError);
    }
  },
  validateString(value) {
    if (!value || typeof value !== 'string') {
      return validatorFailureResponse(`Invalid value:- ${value}.`);
    } else {
      return validatorSuccessResponse();
    }
  },
  validateNumber(value) {
    try {
      if (
        !value ||
        isNaN(Number(value)) ||
        (typeof value === 'string' && isNaN(parseFloat(value)))
      ) {
        return validatorFailureResponse(`Invalid value:- ${value}.`);
      } else {
        return validatorSuccessResponse();
      }
    } catch (error) {
      return validatorFailureResponse(`Invalid value:- ${value}.`);
    }
  },
  validateBoolean(value) {
    const checkValue = typeof value === 'string' ? JSON.parse(value) : value;
    if (typeof checkValue !== 'boolean') {
      return validatorFailureResponse(`Invalid value:- ${value}.`);
    } else {
      return validatorSuccessResponse();
    }
  },
  validateDate(value) {
    const date = new Date(value);
    if (!value || isNaN(date.getTime())) {
      return validatorFailureResponse(`Invalid value:- ${value}.`);
    } else {
      return validatorSuccessResponse();
    }
  }
};
