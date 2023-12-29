import { useTranslation } from 'react-i18next'
import DisplayMd from '~/components/base/Markdown/Display'
import { isEnglish } from '~/helpers/locales/utils'
import { englishText, japaneseText } from './mdContent'

function Layout() {
  const [, i18n] = useTranslation()
  return (
    <div className='-mt-12 flex w-11/12 flex-col items-center laptop:mt-0'>
      <DisplayMd text={isEnglish(i18n.language) ? englishText : japaneseText} />
    </div>
  )
}

export default Layout
