import { Role } from '~/types';

export interface UserSchemaData {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}
