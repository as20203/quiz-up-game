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
