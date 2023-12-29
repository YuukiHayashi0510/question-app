import { QuestionList, Sort } from '~/types/pages/question'
import { Order } from '~/types/pages/question/const'

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
  }

  if (!options.state) return tmpArray

  // 対応状況の条件でフィルター
  const filterArray = tmpArray.filter((v) => v['state'] === options.state)
  return filterArray
}
