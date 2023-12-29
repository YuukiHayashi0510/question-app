import { Day } from './const'

export abstract class DayUtil {
  /**
   * 月曜日の日付を取得する
   * @returns {Date} 月曜日の日付
   */
  static getMonday(date = new Date()): Date {
    const day = date.getDay()
    const diff = date.getDate() - day + (day == Day.Sun ? -6 : Day.Mon)
    return new Date(date.getFullYear(), date.getMonth(), diff)
  }

  /**
   * 日曜日の日付を取得する
   * @returns {Date} 日曜日の日付
   */
  static getSunday(date = new Date()): Date {
    const day = date.getDay()
    const diff = date.getDate() - day + 7
    return new Date(date.getFullYear(), date.getMonth(), diff)
  }
}
