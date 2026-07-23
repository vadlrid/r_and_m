import { useContext } from 'react';
import { Day, Night } from '@components/icons';
import { ThemeContext } from '@components/themeProvider';
import './OptionsBar.scss';

export const OptionsBar = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className='options-bar'>
      <button type='button' onClick={themeContext?.toggleMode}>
        {themeContext?.isDarkMode ? <Night /> : <Day />}
      </button>
    </div>
  );
};
