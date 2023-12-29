export abstract class MonthUtil {
  /**
   * 月初を取得する
   * @param {Date} date 日付、初期値は当日の値になる
   * @returns {Date} 月初
   */
  static getMonthFirstDate(date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  /**
   * 月末を取得する
   * @param {Date} date 日付、初期値は当日の値になる
   * @returns {Date} 月末
   */
  static getMonthFinalDate(date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  /**
   * その月の日数を返す
   * @param {Date} date ほしい月の日付、初期値は当日の値になる
   * @returns {number} その月の日数
   */
  static getNumberOfDaysInMonth(date = new Date()): number {
    const first = this.getMonthFirstDate(date)
    const last = this.getMonthFinalDate(date)
    return last.getDate() - first.getDate() + 1
  }
}
