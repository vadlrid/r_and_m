import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
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
  convertResponse?: (response: R) => T;
  getErrorMessage?: (error: AxiosError<E>) => string;
}

type RequestBody = Record<string, unknown> | undefined;
type QueryParams = Record<string, string | number | null | undefined>;

interface InvokeFetchParams<B extends RequestBody> {
  params?: QueryParams;
  data?: B;
  axiosConfig?: Omit<
    AxiosRequestConfig,
    'method' | 'data' | 'params' | 'baseURL'
  >;
}

export const useRequest = <
  T,
  B extends RequestBody = undefined,
  R = T,
  E = unknown
>({
  url,
  method,
  convertResponse = (response: R) => response as unknown as T,
  getErrorMessage = (error: AxiosError) => error.response?.data as string
}: UseRequestProps<T, R, E>) => {
  const [isLoading, setIsLoading] = useState(false);

  const apiConfig = useApiConfig();
  if (!apiConfig.baseUrl) {
    throw new Error('Base URL not provided');
  }

  const abortControllerRef = useRef<AbortController | null>(null);

  const invokeRequest = useCallback(
    async ({ params, data, axiosConfig }: InvokeFetchParams<B>) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      let result: T | undefined = undefined;

      try {
        const response = await axios.request<B, AxiosResponse<R>>({
          baseURL: apiConfig.baseUrl,
          url,
          method,
          params,
          data,
          signal: controller.signal,
          ...axiosConfig
        });

        result = convertResponse(response.data);
      } catch (err) {
        let axiosErrorCode: string | undefined;
        let errorMessage: string | undefined;

        if (err instanceof AxiosError) {
          axiosErrorCode = err.code;
          errorMessage = getErrorMessage(err);
        }

        if (
          !errorMessage &&
          err instanceof Error &&
          axiosErrorCode !== AxiosError.ERR_CANCELED
        ) {
          errorMessage = err.message;
        }

        if (errorMessage) {
          toast.error(errorMessage);
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setIsLoading(false);
        }
      }

      return result;
    },
    [apiConfig.baseUrl, url, method, convertResponse, getErrorMessage]
  );

  // Отменяем запрос через AbortController в случае unmount
  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  return { invokeRequest, isLoading };
};
