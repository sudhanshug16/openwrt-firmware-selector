import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './locales/translations';

const resources = {
  ca: {
    translation: translations.ca,
  },
  en: {
    translation: translations.en,
  },
  es: {
    translation: translations.es,
  },
  de: {
    translation: translations.de,
  },
  fr: {
    translation: translations.fr,
  },
  it: {
    translation: translations.it,
  },
  no: {
    translation: translations.no,
  },
  pl: {
    translation: translations.pl,
  },
  tr: {
    translation: translations.tr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: (process.env.REACT_APP_I18N_DEBUG || '0') === '1',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
