import i18n from 'i18next';
import HttpBackend, { type HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { Language } from '@shared/types';
import { useOptionsStore } from '@store/options';

export const defaultNS = 'translation' as const;

const INITIAL_LANGUAGE = useOptionsStore.getState().language ?? Language.EN;
const IS_DEV = import.meta.env.DEV;
const LOAD_PATH = '/locales/{{lng}}/{{ns}}.json';
const APP_BASE_URL = import.meta.env.BASE_URL;

void i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    lng: INITIAL_LANGUAGE,
    fallbackLng: Language.EN,

    supportedLngs: [Language.EN, Language.RU],
    load: 'languageOnly',

    ns: [defaultNS],
    defaultNS,

    backend: {
      loadPath: IS_DEV ? LOAD_PATH : APP_BASE_URL + LOAD_PATH
    },

    interpolation: {
      // React самостоятельно экранирует значения.
      escapeValue: false
    },

    returnNull: false,

    debug: IS_DEV
  });

export default i18n;
