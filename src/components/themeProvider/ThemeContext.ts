import { createContext } from 'react';

interface ThemeState {
  isDarkMode: boolean;
  toggleMode(): void;
}

export const ThemeContext = createContext<ThemeState | undefined>(undefined);
