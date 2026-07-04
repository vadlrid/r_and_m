import { create } from 'zustand';
import { HttpStatusCode } from 'axios';
import { CHARACTERS_API, isAbortError } from '@shared/api';
import type { Character, CharacterSearchQuery, PageData } from '@shared/domain';

interface CharactersListState {
  query: CharacterSearchQuery;
  page: number;
  list: Character[];
  isLoading: boolean;
  canNext: boolean;
  scrollTop: number;
  isSuccess: boolean;
  notFound: boolean;
  isFirstLoad: boolean;
}

interface CharactersListActions {
  reset(): void;
  setQuery(query: CharacterSearchQuery): void;
  setScrollTop(scrollTop: number): void;
  setPage(page: number): void;
  updateCharacter(character: Character): void;
  setNotFound(): void;

  fetchCharacters(params: {
    page: number;
    query: CharacterSearchQuery;
  }): Promise<void>;

  changeQuery(query: CharacterSearchQuery): Promise<void>;
  loadMore(): Promise<void>;
}

type CharactersStore = CharactersListState & CharactersListActions;

const initialState: CharactersListState = {
  query: {},
  page: 1,
  list: [],
  isLoading: false,
  canNext: true,
  scrollTop: 0,
  isSuccess: true,
  notFound: false,
  isFirstLoad: true
};

let abortController: AbortController | undefined;

export const useCharactersStore = create<CharactersStore>((set, get) => ({
  ...initialState,

  reset: () => {
    set({
      scrollTop: 0,
      list: [],
      canNext: true,
      page: 1,
      isSuccess: true,
      notFound: false,
      isFirstLoad: true
    });
  },

  setQuery: (query) => {
    set({ query });
  },

  setScrollTop: (scrollTop) => {
    set({ scrollTop });
  },

  setPage: (page) => {
    set({ page });
  },

  updateCharacter: (character) => {
    set((state) => ({
      list: state.list.map((item) =>
        item.id === character.id ? character : item
      )
    }));
  },

  setNotFound: () => {
    set({ notFound: true });
  },

  fetchCharacters: async ({ page, query }) => {
    abortController?.abort();

    const currentController = new AbortController();
    abortController = currentController;

    set({
      isFirstLoad: false,
      isLoading: true
    });

    try {
      const payload: PageData<Character> | undefined =
        await CHARACTERS_API.overrideHandleError((error) => {
          if (error.status === HttpStatusCode.NotFound) {
            get().setNotFound();
            return true;
          }

          return false;
        }).queryCharacters(page, query, currentController.signal);

      // Игнорируем отменённый или устаревший запрос
      if (
        currentController.signal.aborted ||
        abortController !== currentController
      ) {
        return;
      }

      // Отсутствие payload трактуем как отмену/обработанную ошибку
      if (!payload) {
        set({ isLoading: false });
        return;
      }

      const { info, results } = payload;

      set((state) => ({
        list: [...state.list, ...results],
        canNext: !!info.pages && state.page < info.pages,
        isLoading: false,
        isSuccess: true
      }));
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      set({
        isLoading: false,
        isSuccess: false
      });
    }
  },

  changeQuery: async (query) => {
    get().reset();
    get().setQuery(query);

    await get().fetchCharacters({
      page: 1,
      query
    });
  },

  loadMore: async () => {
    const { page, query } = get();
    const nextPage = page + 1;

    get().setPage(nextPage);

    await get().fetchCharacters({
      page: nextPage,
      query
    });
  }
}));
