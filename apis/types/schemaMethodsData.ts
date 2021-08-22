import { UserCategory } from '~/types';

export interface UserSchemaData {
  name?: string;
  username?: string;
  password?: string;
  category?: UserCategory;
}

export interface CategorySchemaData {
  name?: string;
  addedBy?: string;
}

export interface QuestionSchemaData {
  text?: string;
  choices?: string[];
  answer?: string;
  categoryId?: string;
  addedBy?: string;
}

export interface QuizSchemaData {
  score?: number;
  categoryId?: string;
  takenBy?: string;
  adddedOn?: string;
}
