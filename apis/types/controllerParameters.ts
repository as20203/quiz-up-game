import { UserCategory } from '~/types';

export interface UserController {
  name: string;
  username: string;
  password: string;
  category: UserCategory;
}

export interface AuthController {
  username: string;
  password: string;
}

export interface CategoryController {
  name: string;
}

export interface QuestionControlelr {
  text: string;
  choices: string[];
  answer: string;
  categoryId: string;
}

export interface QuizController {
  score: number;
  categoryId: string;
}
