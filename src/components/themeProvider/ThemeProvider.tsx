import { type PropsWithChildren, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const DARK_MODE = 'isDarkMode';
const IS_DARK_MODE_INITIAL = localStorage.getItem(DARK_MODE) === 'true';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(IS_DARK_MODE_INITIAL);

  const toggleMode = () => setDarkMode((value) => !value);

  useEffect(() => {
    localStorage.setItem(DARK_MODE, isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
