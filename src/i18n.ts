import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh from './locales/zh';
import en from './locales/en';

export const defaultNS = 'translation';
export const resources = { zh, en };

const preferredLanguage = navigator.language === 'zh-CN' ? 'zh' : 'en';
const storedLanguage = localStorage.getItem('language');

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: storedLanguage || preferredLanguage,
});

export default i18n;
