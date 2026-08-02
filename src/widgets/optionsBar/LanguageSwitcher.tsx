import { useAppLanguage } from '@shared/hooks';
import { Language } from '@shared/types';

export const LanguageSwitcher = () => {
  const { language, isChangingLanguage, changeLanguage } = useAppLanguage();

  const toggleLanguage = () => {
    const nextLanguage = language === Language.EN ? Language.RU : Language.EN;
    changeLanguage(nextLanguage);
  };

  return (
    <button
      type='button'
      disabled={isChangingLanguage}
      onClick={toggleLanguage}
    >
      {language === Language.EN ? 'EN' : 'РУ'}
    </button>
  );
};
