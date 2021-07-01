export enum HTTP {
  OK = 200,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

type HandlerResponse<T> = {
  data: T;
  error: string | null;
};

export const formatError = (error: string): HandlerResponse<null> => ({
  data: null,
  error,
});

export function formatData<T>(data: T): HandlerResponse<T> {
  return {
    data,
    error: null,
  };
}
