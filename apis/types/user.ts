import { UserSchemaOutput } from '~/types';
export type UserCategory = 'player' | 'contributor' | 'admin';
export interface User extends UserSchemaOutput {
  category: UserCategory;
}
