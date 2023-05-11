/**
 * 曜日の列挙型
 */
export enum Day {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

/**
 * Dateの文字列化に使うオプション
 * @types {Intl.DateTimeFormatOptions}
 */
export const OPTIONS: Intl.DateTimeFormatOptions = {
  hour12: false,
  year: 'numeric',
  month: 'narrow',
  day: 'numeric',
  weekday: 'narrow',
  hour: '2-digit',
  minute: '2-digit',
}

/**
 * Dateの文字列化で日本語化に使うオプション
 */
export const JAPANESE_LOCALES = 'ja-JP-u-ca-japanese'
