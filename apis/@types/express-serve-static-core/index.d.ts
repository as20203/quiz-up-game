import { UserSchemaData, User, CategorySchemaData, QuestionSchemaData } from '~/types';

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
    client: UserSchemaData;
    category: CategorySchemaData;
    question: QuestionSchemaData;
  }
}
