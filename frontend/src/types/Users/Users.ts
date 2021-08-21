type UserCategory = 'player' | 'contributor' | 'admin';

export interface UserSchemaOutput {
  _id: string;
  name: string;
  username: string;
  password: string;
  category: UserCategory;
}
