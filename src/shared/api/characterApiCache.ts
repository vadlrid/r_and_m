import type { AxiosError } from 'axios';
import type { Character, CharacterSearchQuery, PageData } from '@shared/domain';
import { CHARACTERS_API, type CharactersApi } from './characterApi';
import { queryClient } from './queryClient';

const QUERY_KEYS = {
  all: ['characters'],
  getCharacter: (id: number) => [...QUERY_KEYS.all, 'character', id],
  queryCharacters: (page: number, query: CharacterSearchQuery) => [
    ...QUERY_KEYS.all,
    'query',
    page,
    query
  ]
} as const;

class CharacterApiCache implements CharactersApi {
  constructor(private original: CharactersApi) {}

  overrideHandleError(
    handleError: (error: AxiosError) => boolean
  ): CharactersApi {
    this.original.overrideHandleError(handleError);
    return this;
  }

  cancelGetCharacter(id: number): Promise<void> {
    return queryClient.cancelQueries({
      queryKey: QUERY_KEYS.getCharacter(id),
      exact: true
    });
  }

  getCharacter(id: number): Promise<Character | undefined> {
    return queryClient.ensureQueryData({
      queryKey: QUERY_KEYS.getCharacter(id),
      queryFn: (context) => this.original.getCharacter(id, context.signal)
    });
  }

  cancelQueryCharacters(
    page: number,
    query: CharacterSearchQuery
  ): Promise<void> {
    return queryClient.cancelQueries({
      queryKey: QUERY_KEYS.queryCharacters(page, query),
      exact: true
    });
  }

  queryCharacters(
    page: number,
    query: CharacterSearchQuery
  ): Promise<PageData<Character> | undefined> {
    return queryClient.ensureQueryData({
      queryKey: QUERY_KEYS.queryCharacters(page, query),
      queryFn: (context) =>
        this.original.queryCharacters(page, query, context.signal)
    });
  }
}

export const CHARACTERS_API_WITH_CACHE = new CharacterApiCache(CHARACTERS_API);
