import type { CharacterSearchQuery } from '../domain';

export const QUERY_KEYS = {
  all: ['characters'] as const,
  getCharacter: (id: number) => [...QUERY_KEYS.all, 'character', id] as const,
  queryCharacters: (query: CharacterSearchQuery) =>
    [...QUERY_KEYS.all, 'query', query] as const
};
