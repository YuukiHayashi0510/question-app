/**
 * 週番号を取得する
 * @param {Date} date 日付
 * @returns {number} 週番号
 */
export function getWeekNum(date: Date): number {
  const dayNum = date.getDay()
  const sunday = date.getDate() - dayNum
  const saturday = sunday + 6

  return Math.ceil(saturday / 7)
}
