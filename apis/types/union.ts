import {
  PaginatedResults,
  UserSchemaOutput,
  UserController,
  CategorySchemaOutput,
  QuestionSchemaOutput
} from '~/types';

export type SchemaMethodsDataResponse =
  | UserSchemaOutput
  | UserSchemaOutput[]
  | CategorySchemaOutput
  | CategorySchemaOutput[]
  | QuestionSchemaOutput
  | QuestionSchemaOutput[];

export type PaginatedSchemas = UserSchemaOutput[];

export type PassportMiddleware =
  | 'jwt'
  | 'jwtOrderDocuments'
  | 'updatePassword'
  | 'changePassword'
  | 'local.one'
  | 'forgotPassword';

export type SuccessResponse =
  | PaginatedResults<PaginatedSchemas>
  | Record<string, string | boolean | SchemaMethodsDataResponse | number | null>;

export type RequestBodyControllers = UserController | {};
