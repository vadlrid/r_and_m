import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@shared/types';

interface OptionsStore {
  isDarkMode: boolean;
  language: Language;
  toggleDarkMode(): void;
  switchLanguage(language: Language): void;
}

export const useOptionsStore = create<OptionsStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      language: Language.EN,
      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },
      switchLanguage: (language: Language) => {
        set({ language });
      }
    }),
    {
      name: 'options-store',
      partialize: ({ isDarkMode, language }) => ({ isDarkMode, language })
    }
  )
);
