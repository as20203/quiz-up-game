import { UserCategory } from '~/types';

export interface UserSchemaOutput {
  _id: string;
  name: string;
  username: string;
  password: string;
  category: UserCategory;
}
