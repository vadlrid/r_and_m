import { useCallback } from 'react';
import type { AxiosError } from 'axios';
import type {
  Character,
  CharacterResponse,
  CharacterSearchQuery,
  PageData
} from '@shared/domain';
import { HTTP_METHOD, useRequest } from '@shared/hooks';

const convertResponse = (
  response?: PageData<CharacterResponse>
): PageData<Character> | undefined => {
  if (!response) {
    return undefined;
  }
  return {
    ...response,
    results: response.results.map(
      ({ id, name, status, species, location, gender, image }) => ({
        id,
        name,
        status,
        species,
        gender,
        image,
        location: location.name
      })
    )
  };
};

const getErrorMessage = (error: AxiosError<{ error: string }>) =>
  error.response?.data?.error ?? '';

export const useQueryCharacters = (attempts: number) => {
  const { invokeRequest, isLoading } = useRequest({
    url: `/character`,
    method: HTTP_METHOD.GET,
    attempts,
    convertResponse,
    getErrorMessage
  });

  const queryCharacters = useCallback(
    (page: number, query: CharacterSearchQuery) => {
      const name = query?.name?.trim()?.toLowerCase();
      const params = { ...query, name, page };
      return invokeRequest({ params });
    },
    [invokeRequest]
  );

  return {
    queryCharacters,
    isLoading
  };
};
