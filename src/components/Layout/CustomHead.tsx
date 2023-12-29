import Head from 'next/head'
import { useTranslation } from 'react-i18next'

function CustomHead() {
  const [t] = useTranslation()

  return (
    <Head>
      <title>{t('Header.siteTitle')}</title>
    </Head>
  )
}

export default CustomHead
