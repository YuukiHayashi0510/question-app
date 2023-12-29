import { useTranslation } from 'react-i18next'
import StyledButton from '~/components/base/Button/StyledButton'
import { Locales } from '~/helpers/locales/i18n'
import { isEnglish } from '~/helpers/locales/utils'

const ToggleLanguage = () => {
  const [, i18n] = useTranslation()

  const changeLang = () => {
    i18n.changeLanguage(isEnglish(i18n.language) ? Locales.Ja : Locales.En)
  }

  return (
    <StyledButton onClick={changeLang}>
      {isEnglish(i18n.language) ? '日本語' : 'English'}
    </StyledButton>
  )
}

export default ToggleLanguage
