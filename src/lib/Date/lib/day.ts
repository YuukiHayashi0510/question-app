import { Day } from './const'

/**
 * 月曜日の日付を取得する
 * @param {Date} date 日付
 * @returns {Date} 月曜日の日付
 */
export function getMonday(date: Date): Date {
  const day = date.getDay()
  const diff = date.getDate() - day + (day == Day.Sun ? -6 : Day.Mon)
  return new Date(date.getFullYear(), date.getMonth(), diff)
}

/**
 * 日曜日の日付を取得する
 * @param {Date} date 日付
 * @returns {Date} 日曜日の日付
 */
export function getSunday(date: Date): Date {
  const day = date.getDay()
  const diff = date.getDate() - day + 7
  return new Date(date.getFullYear(), date.getMonth(), diff)
}
