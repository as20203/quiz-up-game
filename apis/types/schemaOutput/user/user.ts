import { Role } from '~/types';

export interface UserSchemaOutput {
  name: string;
  email: string;
  password: string;
  role: Role;
}
