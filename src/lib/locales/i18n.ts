import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Env } from '~/types/utils'
import en from './json/en.json'
import ja from './json/ja.json'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: 'ja',
  debug: process.env.NODE_ENV === Env.Development,
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
