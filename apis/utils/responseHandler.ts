import { Response } from 'express';
import { FailureMessages, SuccessResponse } from '~/types';
export const success = (
  response: Response,
  data: SuccessResponse,
  message = '',
  status = 200
): Response => {
  return response.status(status).json({
    message,
    ...data
  });
};
export const failure = (
  response: Response,
  errors: string | FailureMessages[],
  message = '',
  status = 500
): Response => {
  return response.status(status).json({
    message,
    errors
  });
};
