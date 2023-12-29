import { Day } from './const'
import { getWeekNum } from './week'

export abstract class DateEqual {
  /**
   * 同じ年かどうか判別する
   * @returns {boolean} 同じ年かどうか
   */
  static isSameYear(target: Date, refer: Date): boolean {
    return target.getFullYear() === refer.getFullYear()
  }

  /**
   * 同じ月かどうか判別する
   * @returns {boolean} 同じ月かどうか
   */
  static isSameMonth(target: Date, refer: Date): boolean {
    return (
      this.isSameYear(target, refer) && target.getMonth() === refer.getMonth()
    )
  }

  /**
   * 同じ週かどうか判別する
   * @returns {boolean} 同じ週かどうか
   */
  static isSameWeek(target: Date, refer: Date): boolean {
    let bool = false
    // TODO:同じ月以外は同じ週にならない
    if (!this.isSameMonth(target, refer)) {
      return bool
    }

    if (target.getDay() === Day.Sun)
      bool = getWeekNum(target) - 1 === getWeekNum(refer)
    else if (refer.getDay() === Day.Sun)
      bool = getWeekNum(target) === getWeekNum(refer) - 1
    else bool = getWeekNum(target) === getWeekNum(refer)

    return bool
  }

  /**
   * 同じ日かどうか判別する
   * @returns {boolean} 同じ日かどうか
   */
  static isSameDate(target: Date, refer: Date): boolean {
    return (
      this.isSameMonth(target, refer) && target.getDate() === refer.getDate()
    )
  }
}
