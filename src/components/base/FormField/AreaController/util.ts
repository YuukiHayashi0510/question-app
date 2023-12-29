import { isEnglish } from '~/helpers/locales/utils'
import { Area } from '~/types/pages/user/const'

export function getEngLabel(language: string, label: Area): string | undefined {
  if (!isEnglish(language)) return

  switch (label) {
    case Area.Online:
      return 'Online'
    case Area.Fukuoka:
      return 'Fukuoka'
    case Area.Kansai:
      return 'Kansai'
    case Area.Tokyo:
      return 'Tokyo'
    default: {
      const wrongLabel: never = label
      throw new Error(`${wrongLabel} is not in State`)
    }
  }
}
