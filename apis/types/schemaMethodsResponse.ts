import { SchemaMethodsDataResponse } from '~/types';
export interface ModelSuccessResponse<SchemaMethodOutput> {
  isExecuted: true;
  message: string;
  data: SchemaMethodOutput;
  statusCode: number;
}

export interface ModelFailureResponse {
  isExecuted: false;
  message: string;
  error: string;
  statusCode: number;
}

export interface ModelDeletionMethods {
  ok?: number;
  n?: number;
  deletedCount?: number;
}

export type SchemaMethodsResponse<SchemaMethodOutput extends SchemaMethodsDataResponse> =
  | ModelFailureResponse
  | ModelSuccessResponse<SchemaMethodOutput>;
