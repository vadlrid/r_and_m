import { create } from 'zustand';
import { HttpStatusCode } from 'axios';
import { CHARACTERS_API_WITH_CACHE, isAbortError } from '@shared/api';
import type { Character } from '@shared/domain';

const API = CHARACTERS_API_WITH_CACHE;

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
    const previousCharacter = get().character;
    if (previousCharacter) {
      await API.cancelGetCharacter(previousCharacter.id);
    }

    get().reset();

    set({
      isLoading: true
    });

    try {
      const character = await API.overrideHandleError((error) => {
        if (error.status === HttpStatusCode.NotFound) {
          get().setNotFound();
          return true;
        }

        return false;
      }).getCharacter(id);

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
    const previousCharacter = get().character;
    if (previousCharacter) {
      API.cancelGetCharacter(previousCharacter.id);
    }
  }
}));
