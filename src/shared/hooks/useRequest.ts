import { useCallback, useEffect, useRef } from 'react';
import { AxiosError } from 'axios';
import { HTTP_METHOD, doRequest } from '@shared/api';
import { useApiConfig } from './useApiConfig';

interface UseRequestProps<T, R, E> {
  url: string;
  method: HTTP_METHOD;
  convertResponse?(response: R): T;
  handleError?(error: AxiosError<E>): boolean;
  getErrorMessage?(error: AxiosError<E>): string | undefined;
}

type RequestBody = Record<string, unknown> | undefined;
type QueryParams = Record<string, string | number | null | undefined>;

interface InvokeFetchParams<B extends RequestBody> {
  params?: QueryParams;
  data?: B;
}

export const useRequest = <
  T,
  B extends RequestBody = undefined,
  R = T,
  E = unknown
>({
  url,
  method,
  convertResponse,
  handleError,
  getErrorMessage
}: UseRequestProps<T, R, E>) => {
  const apiConfig = useApiConfig();
  if (!apiConfig.baseUrl) {
    throw new Error('Base URL not provided');
  }

  const abortControllerRef = useRef<AbortController | null>(null);

  const invokeRequest = useCallback(
    (invokeFetchParams: InvokeFetchParams<B> = {}) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      return doRequest<T, R, E>({
        ...invokeFetchParams,
        url,
        method,
        baseUrl: apiConfig.baseUrl,
        convertResponse,
        handleError,
        getErrorMessage,
        signal: controller.signal
      });
    },
    [
      apiConfig.baseUrl,
      url,
      method,
      convertResponse,
      handleError,
      getErrorMessage
    ]
  );

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  return invokeRequest;
};
