import { useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  HttpStatusCode,
  default as axios
} from 'axios';
import { useApiConfig } from './useApiConfig';

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

interface UseRequestProps<T, R, E> {
  url: string;
  method: HTTP_METHOD;
  attempts?: number;
  attemptsTimeout?: number;
  convertResponse?(response: R): T;
  handleError?(error: AxiosError<E>): boolean;
  getErrorMessage?(error: AxiosError<E>): string;
}

type RequestBody = Record<string, unknown> | undefined;
type QueryParams = Record<string, string | number | null | undefined>;

const DONT_RETRY_FOR = new Set([HttpStatusCode.NotFound]);

interface InvokeFetchParams<B extends RequestBody> {
  params?: QueryParams;
  data?: B;
  axiosConfig?: Omit<
    AxiosRequestConfig,
    'method' | 'data' | 'params' | 'baseURL'
  >;
}
interface InvokeFetchParamsWithAbortSignal<
  B extends RequestBody
> extends InvokeFetchParams<B> {
  abortSignal: AbortSignal;
}

const DEFAULT_CONVERT_RESPONSE = <T, R = T>(response: R) =>
  response as unknown as T;
const DEFAULT_HANDLER_ERROR = () => false;
const DEFAULT_GET_ERROR_MESSAGE = (error: AxiosError) =>
  error.response?.data as string;

export const useRequest = <
  T,
  B extends RequestBody = undefined,
  R = T,
  E = unknown
>({
  url,
  method,
  attempts,
  attemptsTimeout = 5000,
  convertResponse = DEFAULT_CONVERT_RESPONSE<T, R>,
  handleError = DEFAULT_HANDLER_ERROR,
  getErrorMessage = DEFAULT_GET_ERROR_MESSAGE
}: UseRequestProps<T, R, E>) => {
  const apiConfig = useApiConfig();
  if (!apiConfig.baseUrl) {
    throw new Error('Base URL not provided');
  }
  if (!attempts && !apiConfig.maxAttempts) {
    throw new Error('Max attempts not provided');
  }
  const maxAttempts = attempts ?? apiConfig.maxAttempts;

  const abortControllerRef = useRef<AbortController | null>(null);

  const doRequest = useCallback(
    async ({
      params,
      data,
      axiosConfig,
      abortSignal
    }: InvokeFetchParamsWithAbortSignal<B>) => {
      let result: T | undefined = undefined;

      try {
        const response = await axios.request<B, AxiosResponse<R>>({
          baseURL: apiConfig.baseUrl,
          url,
          method,
          params,
          data,
          signal: abortSignal,
          ...axiosConfig
        });

        result = convertResponse(response.data);
      } catch (err) {
        const errorCode = err instanceof AxiosError ? err.code : undefined;
        if (errorCode !== AxiosError.ERR_CANCELED) {
          throw err;
        }
      }
      return result;
    },
    [apiConfig.baseUrl, url, method, convertResponse]
  );

  const invokeRequest = useCallback(
    (invokeFetchParams: InvokeFetchParams<B> = {}) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      let i = 0;

      const invoke = (): Promise<T | undefined> =>
        doRequest({
          ...invokeFetchParams,
          abortSignal: controller.signal
        }).catch((err) => {
          if (
            err instanceof AxiosError &&
            !!err.status &&
            DONT_RETRY_FOR.has(err.status)
          ) {
            return Promise.reject(err);
          }

          if (i < maxAttempts) {
            i++;
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                invoke().then(resolve, reject);
              }, attemptsTimeout);
            });
          }
          return Promise.reject(err);
        });

      return new Promise<T | undefined>((resolve) => {
        invoke()
          .then((result) => resolve(result))
          .catch((err) => {
            let errorMessage: string | undefined;

            if (err instanceof AxiosError) {
              // Если ошибка обработана внешним обработчиком - выходим
              if (handleError(err)) {
                resolve(undefined);
                return;
              }

              errorMessage = getErrorMessage(err);
            }

            if (!errorMessage && err instanceof Error) {
              errorMessage = err.message;
            }

            if (errorMessage) {
              toast.error(errorMessage);
            }

            resolve(undefined);
          });
      });
    },
    [doRequest, maxAttempts, attemptsTimeout, getErrorMessage, handleError]
  );

  // Отменяем запрос через AbortController в случае unmount
  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  return invokeRequest;
};
