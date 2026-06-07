import { createContext } from 'react';
import type { Character, CharacterSearchQuery } from '@shared/domain';

interface CharactersListState {
  query: CharacterSearchQuery;
  page: number;
  list: Character[];
  isLoading: boolean;
  scrollTop: number;
  changeQuery(query: CharacterSearchQuery): void;
  loadMore(): void;
  changeScrollTop(value: number): void;
  updateCharacter(character: Character): void;
}

export const CharactersListStateContext = createContext<
  CharactersListState | undefined
>(undefined);
