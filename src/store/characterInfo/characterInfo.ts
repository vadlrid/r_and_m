import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import { CHARACTERS_API } from '@shared/api';
import type { Character } from '@shared/domain';

interface CharacterInfoState {
  character?: Character;
  isLoading: boolean;
  notFound: boolean;
}

const initialState: CharacterInfoState = {
  isLoading: false,
  notFound: false
};

export const getCharacter = createAsyncThunk<Character | undefined, number>(
  'characterInfo/get',
  (id, { dispatch, signal }) => {
    dispatch(characterInfoSlice.actions.reset());
    return CHARACTERS_API.overrideHandleError((error) => {
      if (error.status === HttpStatusCode.NotFound) {
        dispatch(characterInfoSlice.actions.notFound());
        return true;
      }
      return false;
    }).getCharacter(id, signal);
  }
);

const characterInfoSlice = createSlice({
  name: 'characterInfo',
  initialState,
  reducers: {
    reset(state: CharacterInfoState) {
      state.notFound = false;
      state.character = undefined;
    },
    notFound(state) {
      state.notFound = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacter.pending, (state, action) => {
        console.log('REQUEST START', action);
        state.isLoading = true;
      })
      .addCase(getCharacter.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        console.log('SUCCESS', action);
        state.character = action.payload;
        state.isLoading = false;
      })
      .addCase(getCharacter.rejected, (state, action) => {
        // Игнорируем Abort Error, так как это означает:
        // - Запрос отменён - другим запроса
        // - Мы больше не видим компонент относящийся к этому запроса из-за umount
        if (action.error.name === 'AbortError') {
          return;
        }
        state.isLoading = false;
      });
  }
});

export const characterInfoSliceReducer = characterInfoSlice.reducer;
