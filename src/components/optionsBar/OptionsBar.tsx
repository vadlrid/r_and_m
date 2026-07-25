import { Day, Night } from '@components/icons';
import { useAppLanguage } from '@shared/hooks';
import { Language } from '@shared/types';
import { useOptionsStore } from '@store/options';
import './OptionsBar.scss';

export const OptionsBar = () => {
  const isDarkMode = useOptionsStore((store) => store.isDarkMode);
  const toggleDarkMode = useOptionsStore((store) => store.toggleDarkMode);

  const { language, isChangingLanguage, changeLanguage } = useAppLanguage();

  return (
    <div className='options-bar'>
      <button type='button' onClick={toggleDarkMode}>
        {isDarkMode ? <Night /> : <Day />}
      </button>
      {language === Language.EN && (
        <button
          type='button'
          disabled={isChangingLanguage}
          onClick={() => changeLanguage(Language.RU)}
        >
          EN
        </button>
      )}
      {language === Language.RU && (
        <button
          type='button'
          disabled={isChangingLanguage}
          onClick={() => changeLanguage(Language.EN)}
        >
          РУ
        </button>
      )}
    </div>
  );
};
