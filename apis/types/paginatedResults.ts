import { PaginatedSchemas } from '~/types';

export interface PaginatedResults<SchemaType extends PaginatedSchemas> {
  next?: cursors;
  previous?: cursors;
  results: SchemaType;
  totalDocuments: number;
}

type cursors = {
  page: number;
  limit: number;
};
