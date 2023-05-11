import { Order, QuestionList, Sort } from '~/types/question'

/**
 * 質問のリストをソートする
 * @param {QuestionList} array 質問のリスト
 * @param {Sort} options ソートのオプション
 * @returns {QuestionList} ソート後の質問のリスト
 */
export function sortQuestionList(
  array: QuestionList,
  options: Sort
): QuestionList {
  if (!options.state && !options.date) return array

  const tmpArray = [...array]
  // 日付の昇順、降順
  switch (options.date) {
    case Order.Desc:
      tmpArray.sort((a, b) => {
        if (a['date'] > b['date']) return -1
        if (a['date'] < b['date']) return 1
        return 0
      })
      break
    case Order.Asc:
      tmpArray.sort((a, b) => {
        if (a['date'] < b['date']) return -1
        if (a['date'] > b['date']) return 1
        return 0
      })
      break
    default: {
      // 空文字の場合は正常なので、弾かない
      if (options.date === '') break

      // 空文字以外でOrderに含まれていないものを弾く
      const wrongOrder: never = options.date
      throw new Error(`${wrongOrder} is not in Order`)
    }
  }

  if (!options.state) return tmpArray

  // 対応状況の条件でフィルター
  const filterArray = tmpArray.filter((v) => v['state'] === options.state)
  return filterArray
}
