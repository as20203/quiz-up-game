import {
  UserSchemaData,
  User,
  CategorySchemaData,
  QuestionSchemaData,
  QuizSchemaData
} from '~/types';

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
    client: UserSchemaData;
    category: CategorySchemaData;
    question: QuestionSchemaData;
    quiz: QuizSchemaData;
  }
}
