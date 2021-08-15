import {
  PaginatedResults,
  ModelSuccessResponse,
  ModelFailureResponse,
  PaginatedSchemas
} from '~/types';
export const modelSuccessResponse = <SchemaMethodOutput>(
  data: SchemaMethodOutput,
  statusCode = 200
): ModelSuccessResponse<SchemaMethodOutput> => {
  return {
    isExecuted: true,
    message: 'Successfully Executed',
    data,
    statusCode
  };
};

export const modelFailureResponse = (error: string, statusCode = 500): ModelFailureResponse => {
  return {
    isExecuted: false,
    message: 'Failed At Insertion',
    error,
    statusCode
  };
};

export const modelResult = <PaginatedResult extends PaginatedSchemas>(
  pageNumber: number,
  limit: number,
  totalDocuments: number,
  results: PaginatedResult
) => {
  const startIndex = (pageNumber - 1) * limit;
  const endIndex = pageNumber * limit;
  const modelResult = { results, totalDocuments } as PaginatedResults<PaginatedResult>;
  if (endIndex < totalDocuments) {
    modelResult.next = {
      page: pageNumber + 1,
      limit
    };
  }

  if (startIndex > 0) {
    modelResult.previous = {
      page: pageNumber - 1,
      limit
    };
  }
  return modelResult;
};
