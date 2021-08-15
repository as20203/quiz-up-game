import { Request as CustomRequest } from 'express';
import { RequestBodyControllers } from '~/types';
import { ParamsDictionary } from 'express-serve-static-core';

export type Query = {
  name: string;
};
export type Request<T extends RequestBodyControllers = {}> = CustomRequest<
  ParamsDictionary,
  unknown,
  T,
  Query
>;
