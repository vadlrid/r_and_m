import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import { CHARACTERS_API } from '@shared/api';
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

const createThunk = createAsyncThunk.withTypes<{
  state: {
    characters: CharactersListState;
  };
}>();

let abortController: AbortController | undefined;

const fetchCharacters = createThunk<
  PageData<Character> | undefined,
  { page: number; query: CharacterSearchQuery }
>('characters/fetch', ({ page, query }, { dispatch }) => {
  abortController?.abort();
  abortController = new AbortController();
  return CHARACTERS_API.overrideHandleError((error) => {
    if (error.status === HttpStatusCode.NotFound) {
      dispatch(charactersSlice.actions.notFound());
      return true;
    }
    return false;
  }).queryCharacters(page, query, abortController.signal);
});

export const changeQuery = createThunk<void, CharacterSearchQuery>(
  'characters/changeQuery',
  async (query, { dispatch }) => {
    dispatch(charactersSlice.actions.reset());
    dispatch(charactersSlice.actions.setQuery(query));
    await dispatch(fetchCharacters({ page: 1, query })).unwrap();
  }
);

export const loadMore = createThunk<void, void>(
  'characters/loadMore',
  async (_, { dispatch, getState }) => {
    const state = getState().characters;
    const page = state.page + 1;
    const query = state.query;
    dispatch(charactersSlice.actions.setPage(page));
    await dispatch(fetchCharacters({ page, query })).unwrap();
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    reset(state) {
      state.scrollTop = 0;
      state.list = [];
      state.canNext = true;
      state.page = 1;
      state.isSuccess = true;
      state.notFound = false;
      state.isFirstLoad = true;
    },
    setQuery(state, action: PayloadAction<CharacterSearchQuery>) {
      state.query = action.payload;
    },
    setScrollTop(state, action: PayloadAction<number>) {
      state.scrollTop = action.payload;
    },
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    updateCharacter(state, action: PayloadAction<Character>) {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.list[index] = action.payload;
      }
    },
    notFound(state) {
      state.notFound = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isFirstLoad = false;
        state.isLoading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        // Отсутствие payload интерпретируем как отмену предыдущего запроса новым
        if (!action.payload) {
          return;
        }
        const { info, results } = action.payload;
        state.list = [...state.list, ...results];
        state.canNext = !!info.pages && state.page < info.pages;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        // Игнорируем Abort Error, так как это означает:
        // - Запрос отменён - другим запроса
        if (action.error.name === 'AbortError') {
          return;
        }
        state.isLoading = false;
        state.isSuccess = false;
      });
  }
});

export const { setScrollTop, updateCharacter } = charactersSlice.actions;

export const characterSliceReducer = charactersSlice.reducer;
