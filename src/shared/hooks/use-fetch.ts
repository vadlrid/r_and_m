import { useCallback, useEffect, useRef, useState } from 'react';

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

interface UseFetchProps<T> {
  url: string;
  method: HTTP_METHOD;
  convertResponse?: (response: unknown) => T;
}

type RequestBody = Record<string, unknown> | undefined;
type QueryParams = Record<string, string | number | null | undefined>;

interface InvokeFetchParams<B extends RequestBody> {
  queryParams?: QueryParams;
  body?: B;
  fetchOptions?: Omit<RequestInit, 'method' | 'body'>;
}

const addQueryParams = (url: string, queryParams?: QueryParams) => {
  if (!queryParams) {
    return url;
  }

  const paramParts = Object.entries(queryParams).reduce(
    (parts, [key, value]) => {
      if (value === null || value === undefined || value === '') {
        return parts;
      }
      return [...parts, `${key}=${encodeURIComponent(value.toString())}`];
    },
    [] as string[]
  );

  if (!paramParts.length) {
    return url;
  }

  return `${url}?${paramParts.join('&')}`;
};

export const useFetch = <T, B extends RequestBody = undefined>({
  url,
  method,
  convertResponse = (response) => response as T
}: UseFetchProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | unknown | undefined>(undefined);

  const abortControllerRef = useRef<AbortController | null>(null);

  const invokeFetch = useCallback(
    async ({ queryParams, body, fetchOptions }: InvokeFetchParams<B>) => {
      const requestUrl = addQueryParams(url, queryParams);

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);

      try {
        const response = await fetch(requestUrl, {
          method,
          ...fetchOptions,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal
        });

        if (!response.ok) {
          setError(new Error(`Response not OK!. STATUS: ${response.status}`));
          return;
        }

        const responseBody = await response.json();
        setData(convertResponse(responseBody));
      } catch (err) {
        if (!(err instanceof Error) || err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setIsLoading(false);
        }
      }
    },
    [url, method, convertResponse]
  );

  // Отменяем запрос через AbortController в случае unmount
  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  return { invokeFetch, isLoading, data, error };
};
