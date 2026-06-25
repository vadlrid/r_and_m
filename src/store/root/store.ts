import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { characterInfoSliceReducer } from '../characterInfo';
import { characterSliceReducer } from '../characters';

export const store = configureStore({
  reducer: {
    characters: characterSliceReducer,
    characterInfo: characterInfoSliceReducer
  }
});

export const useAppDispatch = useDispatch<typeof store.dispatch>;
export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
