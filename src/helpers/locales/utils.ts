import { Locales } from './i18n'

/**
 * i18nの言語が英語かどうか判別する
 * @param {string} language i18n
 * @returns {boolean}
 */
export function isEnglish(language: string): boolean {
  return language === Locales.En
}
