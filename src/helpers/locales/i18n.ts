import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './json/en.json'
import ja from './json/ja.json'

export enum Locales {
  En = 'en',
  Ja = 'ja',
}

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: Locales.Ja,
  debug: process.env.NODE_ENV === 'development',
  resources: {
    ja: {
      translation: ja,
    },
    en: {
      translation: en,
    },
  },
  interpolation: { escapeValue: false },
})

export default i18n
