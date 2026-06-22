import toast from 'react-hot-toast';
import {
  AxiosError,
  type AxiosRequestConfig,
  HttpStatusCode,
  default as axios
} from 'axios';

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

interface DoRequestProps<T, R, E> {
  url: string;
  method: HTTP_METHOD;
  baseUrl: string;
  maxAttempts?: number;
  attemptsTimeout?: number;
  convertResponse?(response: R): T | Promise<T>;
  handleError?(error: AxiosError<E>): boolean;
  getErrorMessage?(error: AxiosError<E>): string | undefined;
  params?: Record<string, string | number | null | undefined>;
  data?: Record<string, unknown> | undefined;
  signal?: AbortSignal;
}

const DONT_RETRY_FOR = new Set([HttpStatusCode.NotFound]);

export const doRequest = async <T, R, E>({
  url,
  method,
  baseUrl,
  maxAttempts = 5,
  attemptsTimeout = 5000,
  convertResponse = (response: unknown) => response as T,
  handleError = () => false,
  getErrorMessage = (error) => error.response?.data as string | undefined,
  params,
  data,
  signal
}: DoRequestProps<T, R, E> & { signal?: AbortSignal }): Promise<
  T | undefined
> => {
  let currentAttempts = 0;

  const doSingleRequest = async (): Promise<T | undefined> => {
    const config: AxiosRequestConfig = {
      baseURL: baseUrl,
      url,
      method,
      params,
      data,
      signal
    };

    try {
      const response = await axios.request<R>(config);
      return convertResponse(response.data);
    } catch (err) {
      const errorCode = err instanceof AxiosError ? err.code : undefined;
      if (errorCode !== AxiosError.ERR_CANCELED) {
        throw err;
      }
    }
  };

  while (currentAttempts < maxAttempts) {
    try {
      return await doSingleRequest();
    } catch (err) {
      if (
        err instanceof AxiosError &&
        !!err.status &&
        DONT_RETRY_FOR.has(err.status)
      ) {
        throw err;
      }

      currentAttempts++;

      if (currentAttempts >= maxAttempts) {
        let errorMessage: string | undefined;

        if (err instanceof AxiosError) {
          // Если ошибка обработана внешним обработчиком - выходим
          if (handleError(err)) {
            return undefined;
          }

          errorMessage = getErrorMessage(err);
        }

        if (!errorMessage && err instanceof Error) {
          errorMessage = err.message;
        }

        if (errorMessage) {
          toast.error(errorMessage);
        }

        return undefined;
      }

      await new Promise((resolve) => setTimeout(resolve, attemptsTimeout));
    }
  }

  return undefined;
};
