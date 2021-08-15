import { UserSchema, UserSchemaData, SchemaMethodsResponse, UserSchemaOutput } from '~/types';
import { Model } from 'mongoose';

export interface UserSchemaMethods extends Model<UserSchema> {
  save(data: UserSchemaData): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
  getUser(userId: string): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
  deleteUser(userId: string): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
  updateUser(
    userId: string,
    data: UserSchemaData
  ): Promise<SchemaMethodsResponse<UserSchemaOutput>>;
}
