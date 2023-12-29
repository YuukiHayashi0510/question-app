import { TestResult } from '~/types/pages/code'
import { ChipColor } from '../utils'

export function getChipColor(label: TestResult): ChipColor {
  let color: ChipColor = 'default'
  switch (label) {
    case TestResult.AC:
      color = 'success'
      break
    case TestResult.RE:
    case TestResult.CE:
      color = 'error'
      break
    default:
      color = 'warning'
      break
  }
  return color
}
