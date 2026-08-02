import { Day, Night } from '@components/icons';
import { useOptionsStore } from '@store/options';

export const ThemeSwitcher = () => {
  const isDarkMode = useOptionsStore((store) => store.isDarkMode);
  const toggleDarkMode = useOptionsStore((store) => store.toggleDarkMode);
  return (
    <button type='button' onClick={toggleDarkMode}>
      {isDarkMode ? <Night /> : <Day />}
    </button>
  );
};
