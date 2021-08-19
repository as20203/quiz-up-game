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
