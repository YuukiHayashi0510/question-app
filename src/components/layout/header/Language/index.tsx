import { useTranslation } from 'react-i18next'
import StyledButton from '~/components/base/Button/StyledButton'
import { isEnglish } from '~/lib/locales/utils'
import { Locales } from '~/types/app'

const ToggleLanguage = () => {
  const [, i18n] = useTranslation()

  const changeLang = () => {
    i18n.changeLanguage(isEnglish(i18n.language) ? Locales.Ja : Locales.En)
  }

  return (
    <>
      <StyledButton onClick={changeLang}>
        {isEnglish(i18n.language) ? '日本語' : 'English'}
      </StyledButton>
    </>
  )
}

export default ToggleLanguage
