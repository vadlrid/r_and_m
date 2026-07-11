import { create } from 'zustand';
import type { CharacterSearchQuery } from '@shared/domain';

interface CharactersListState {
  query: CharacterSearchQuery;
  scrollTop: number;
}

interface CharactersListActions {
  setQuery(query: CharacterSearchQuery): void;
  setScrollTop(scrollTop: number): void;
}

type CharactersStore = CharactersListState & CharactersListActions;

const initialState: CharactersListState = {
  query: {},
  scrollTop: 0
};

export const useCharactersStore = create<CharactersStore>((set) => ({
  ...initialState,

  setQuery: (query) => {
    set({ query });
    set({ scrollTop: 0 });
  },

  setScrollTop: (scrollTop) => {
    set({ scrollTop });
  }
}));
