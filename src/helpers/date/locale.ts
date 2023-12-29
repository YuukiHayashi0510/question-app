import { JAPANESE_LOCALES, OPTIONS } from './const'

export abstract class DateLocale {
  /**
   * 日付を日本語の日付に変換する
   * @param {Date} date 日付
   * @param {boolean} hourActive 時間を表示するかどうか, 初期値false
   * @returns {string} 日本語の日付
   */
  static translateJapanese(date: Date, hourActive = false): string {
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
  static translateEnglish(date: Date): string {
    return date.toString().replace('GMT+0900 (Japan Standard Time)', '')
  }

  /**
   * 日付を日本語の日付に変換する
   * @param {Date} date 日付
   *
   * @returns {string} 日本語の日付
   */
  static translateShortJapanese(date: Date): string {
    return date.toLocaleDateString(JAPANESE_LOCALES, {
      month: 'narrow',
      day: 'numeric',
      weekday: 'narrow',
    })
  }
}
