import { create } from 'zustand';
import { HttpStatusCode } from 'axios';
import { CHARACTERS_API, isAbortError } from '@shared/api';
import type { Character } from '@shared/domain';

interface CharacterInfoState {
  character?: Character;
  isLoading: boolean;
  notFound: boolean;
}

interface CharacterInfoActions {
  reset(): void;
  setNotFound(): void;
  getCharacter(id: number): Promise<void>;
  abortGetCharacter(): void;
}

type CharacterInfoStore = CharacterInfoState & CharacterInfoActions;

const initialState: CharacterInfoState = {
  character: undefined,
  isLoading: false,
  notFound: false
};

let abortController: AbortController | undefined;

export const useCharacterInfoStore = create<CharacterInfoStore>((set, get) => ({
  ...initialState,

  reset: () => {
    set({
      notFound: false,
      character: undefined
    });
  },

  setNotFound: () => {
    set({ notFound: true });
  },

  getCharacter: async (id) => {
    abortController?.abort();

    const currentController = new AbortController();
    abortController = currentController;

    get().reset();

    set({
      isLoading: true
    });

    try {
      const character = await CHARACTERS_API.overrideHandleError((error) => {
        if (error.status === HttpStatusCode.NotFound) {
          get().setNotFound();
          return true;
        }

        return false;
      }).getCharacter(id, currentController.signal);

      // Игнорируем отменённый или устаревший запрос
      if (
        currentController.signal.aborted ||
        abortController !== currentController
      ) {
        return;
      }

      if (!character) {
        set({ isLoading: false });
        return;
      }

      set({
        character,
        isLoading: false
      });
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      set({
        isLoading: false
      });
    }
  },

  abortGetCharacter: () => {
    abortController?.abort();
  }
}));
