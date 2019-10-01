import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en.json';
import translationDE from './locales/de.json';
import translationES from './locales/es.json';
import translationRU from './locales/ru.json';
import translationPTBR from './locales/pt_br.json';
import translationTR from './locales/tr.json';
import Config from './config';

const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  es: {
    translation: translationES
  },
  ru: {
    translation: translationRU,
  },
  pt_br: {
    translation: translationPTBR,
  },
  tr:{
    translation: translationTR,
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: Config.settings.i18nDebug,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
