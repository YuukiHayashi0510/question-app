import { isEnglish } from '~/helpers/locales/utils'
import { State } from '~/types/pages/form/const'
import { ChipColor } from '../utils'

/**
 * チップの色を取得する
 * @param {State} label
 * @returns {ChipColor} チップの色
 */
export function getChipColor(label: State): ChipColor {
  switch (label) {
    case State.Yet:
      return 'warning'
    case State.Doing:
      return 'info'
    case State.Done:
      return 'success'
    default:
      return 'default'
  }
}

/**
 * 英語のラベルを取得する
 * @param {string} label 日本語のラベル
 * @returns {string | undefined} 英語のラベル
 */
export function getEngLabel(
  language: string,
  label: State
): string | undefined {
  if (!isEnglish(language)) return

  switch (label) {
    case State.Yet:
      return 'Yet'
    case State.Doing:
      return 'Doing'
    case State.Done:
      return 'Done'
    default: {
      const wrongLabel: never = label
      throw new Error(`${wrongLabel} is not in State`)
    }
  }
}
