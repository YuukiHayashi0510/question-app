import { JAPANESE_LOCALES, OPTIONS } from './const'

/**
 * 日付を日本語の日付に変換する
 * @param {Date} date 日付
 * @param {boolean} hourActive 時間を表示するかどうか, 初期値false
 * @returns {string} 日本語の日付
 */
export function dateToLocaleString(date: Date, hourActive = false): string {
  const str = hourActive
    ? date.toLocaleDateString(JAPANESE_LOCALES, OPTIONS)
    : date.toLocaleDateString(JAPANESE_LOCALES, {
        hour12: false,
        year: 'numeric',
        month: 'narrow',
        day: 'numeric',
        weekday: 'narrow',
      })

  return str
}

/**
 * 日付を英語の日付に変換する
 * @param {Date} date 日付
 * @returns {string} 英語の日付
 */
export function dateToEngString(date: Date): string {
  const str = date.toString().replace('GMT+0900 (Japan Standard Time)', '')
  return str
}
