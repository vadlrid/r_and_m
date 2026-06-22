import { useCallback } from 'react';
import { HTTP_METHOD, convertCharacter, getErrorMessage } from '@shared/api';
import type {
  Character,
  CharacterResponse,
  CharacterSearchQuery,
  PageData
} from '@shared/domain';
import { useRequest } from '@shared/hooks';

const convertResponse = (
  response?: PageData<CharacterResponse>
): PageData<Character> | undefined => {
  if (!response) {
    return undefined;
  }
  return {
    ...response,
    results: response.results.map(convertCharacter)
  };
};

export const useQueryCharacters = () => {
  const invokeRequest = useRequest({
    url: `/character`,
    method: HTTP_METHOD.GET,
    convertResponse,
    getErrorMessage
  });

  return useCallback(
    (page: number, query: CharacterSearchQuery) => {
      const name = query?.name?.trim()?.toLowerCase();
      const params = { ...query, name, page };
      return invokeRequest({ params });
    },
    [invokeRequest]
  );
};
