import { useCallback } from 'react';
import type {
  Character,
  CharacterResponse,
  CharacterSearchQuery,
  PageData
} from '@shared/domain';
import { HTTP_METHOD, useFetch } from '@shared/hooks';
import { BASE_URL } from './baseUrl';

const convertCharacters = (
  response: PageData<CharacterResponse>
): PageData<Character> => {
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

export const useQueryCharacters = () => {
  const { invokeFetch, data, isLoading, error } = useFetch({
    url: `${BASE_URL}/api/character`,
    method: HTTP_METHOD.GET,
    convertResponse: convertCharacters
  });

  const queryCharacters = useCallback(
    (query: CharacterSearchQuery) => {
      invokeFetch({
        queryParams: query as Record<string, string>
      });
    },
    [invokeFetch]
  );

  return {
    queryCharacters,
    isLoading,
    data,
    error
  };
};
