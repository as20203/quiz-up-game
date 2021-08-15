import { UserSchemaOutput } from '~/types';

export type Role = 'admin' | 'user';
export type Category = 'customer' | 'employee';

export interface User extends UserSchemaOutput {
  category: Category;
}
