import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@shared/types';
import { useOptionsStore } from '@store/options';

export const useAppLanguage = () => {
  const { i18n } = useTranslation();
  const language = useOptionsStore((state) => state.language);
  const switchLanguage = useOptionsStore((state) => state.switchLanguage);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const changeLanguage = useCallback(
    async (nextLanguage: Language) => {
      if (language === nextLanguage) {
        return;
      }
      setIsChangingLanguage(true);

      try {
        await i18n.changeLanguage(nextLanguage);
        switchLanguage(nextLanguage);
      } finally {
        setIsChangingLanguage(false);
      }
    },
    [i18n, language, switchLanguage]
  );

  return {
    language,
    changeLanguage,
    isChangingLanguage
  };
};
