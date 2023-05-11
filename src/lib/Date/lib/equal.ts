import { Day } from './const'
import { getWeekNum } from './week'

/**
 * 同じ年かどうか判別する
 * @param {Date} target 比較する日付
 * @param {Date} refer 比較元の日付
 * @returns {boolean} 同じ年かどうか
 */
export function isSameYear(target: Date, refer: Date): boolean {
  return target.getFullYear() === refer.getFullYear()
}

/**
 * 同じ月かどうか判別する
 * @param {Date} target 比較する日付
 * @param {Date} refer 比較元の日付
 * @returns {boolean} 同じ月かどうか
 */
export function isSameMonth(target: Date, refer: Date): boolean {
  return isSameYear(target, refer) && target.getMonth() === refer.getMonth()
}

/**
 * 同じ週かどうか判別する
 * @param {Date} target 比較する日付
 * @param {Date} refer 比較元の日付
 * @returns {boolean} 同じ週かどうか
 */
export function isSameWeek(target: Date, refer: Date): boolean {
  let bool = false
  // TODO:同じ月以外は同じ週にならない
  if (!isSameMonth(target, refer)) {
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
 * @param {Date} target 比較する日付
 * @param {Date} refer 比較元の日付
 * @returns {boolean} 同じ日かどうか
 */
export function isSameDate(target: Date, refer: Date): boolean {
  return isSameMonth(target, refer) && target.getDate() === refer.getDate()
}
