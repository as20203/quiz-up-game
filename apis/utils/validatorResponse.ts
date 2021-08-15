export const validatorSuccessResponse = (message = '') => {
  return {
    isValid: true,
    message
  };
};
export const validatorFailureResponse = (message = '') => {
  return {
    isValid: false,
    message
  };
};
