import {
  UserSchema,
  UserSchemaData,
  CategorySchema,
  SchemaMethodsResponse,
  UserSchemaOutput,
  CategorySchemaData,
  CategorySchemaOutput,
  QuestionSchema,
  QuestionSchemaData,
  QuestionSchemaOutput,
  QuizSchema,
  QuizSchemaData,
  QuizSchemaOutput
} from '~/types';
import { Model } from 'mongoose';
export interface UserSchemaMethods extends Model<UserSchema> {
  save(data: UserSchemaData): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
  getUser(userId: string): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
  deleteUser(userId: string): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
  updateUser(
    userId: string,
    data: UserSchemaData
  ): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
  getUsers(
    conditions: Record<string, string | number> | {}
  ): Promise<SchemaMethodsResponse<UserSchemaOutput[]>>;
}

export interface CategorySchemaMethods extends Model<CategorySchema> {
  save(data: CategorySchemaData): Promise<SchemaMethodsResponse<CategorySchemaOutput>>;
  getCategory(categoryId: string): Promise<SchemaMethodsResponse<CategorySchemaOutput>>;
  deleteCategory(category: string): Promise<SchemaMethodsResponse<CategorySchemaOutput>>;
  updateCategory(
    categoryId: string,
    data: CategorySchemaData
  ): Promise<SchemaMethodsResponse<CategorySchemaOutput>>;
  getCategories(
    conditions: Record<string, string | number> | {}
  ): Promise<SchemaMethodsResponse<CategorySchemaOutput[]>>;
}

export interface QuestionSchemaMethods extends Model<QuestionSchema> {
  save(data: QuestionSchemaData): Promise<SchemaMethodsResponse<QuestionSchemaOutput>>;
  getQuestion(questionId: string): Promise<SchemaMethodsResponse<QuestionSchemaOutput>>;
  deleteQuestion(questionId: string): Promise<SchemaMethodsResponse<QuestionSchemaOutput>>;
  updateQuestion(
    questionId: string,
    data: QuestionSchemaData
  ): Promise<SchemaMethodsResponse<QuestionSchemaOutput>>;
  getQuestions(
    conditions: Record<string, string | number> | {}
  ): Promise<SchemaMethodsResponse<QuestionSchemaOutput[]>>;
}

export interface QuizSchemaMethods extends Model<QuizSchema> {
  save(data: QuizSchemaData): Promise<SchemaMethodsResponse<QuizSchemaOutput>>;
  getQuiz(quizId: string): Promise<SchemaMethodsResponse<QuizSchemaOutput>>;
  deleteQuiz(quizId: string): Promise<SchemaMethodsResponse<QuizSchemaOutput>>;
  updateQuiz(
    questionId: string,
    data: QuizSchemaData
  ): Promise<SchemaMethodsResponse<QuizSchemaOutput>>;
  getQuizzes(
    conditions: Record<string, string | number> | {}
  ): Promise<SchemaMethodsResponse<QuizSchemaOutput[]>>;
}
