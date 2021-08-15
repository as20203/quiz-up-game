export interface InputValidator {
  validatePassword(url: string): ValidatorResponses;
  validateEmail(email: string): ValidatorResponses;
  validateFromEnum<T extends string | number = string>(
    value: T,
    valuesEnum: T[]
  ): ValidatorResponses;
  validateParsing(value: string): ValidatorResponses;
  validateString(value: string): ValidatorResponses;
  validateNumber<T>(value: T): ValidatorResponses;
  validateBoolean(value: boolean): ValidatorResponses;
  validateDate<T extends string | Date>(value: T): ValidatorResponses;
}

export interface ValidatorResponses {
  message: string;
  isValid: boolean;
}
