import Head from 'next/head'
import { useTranslation } from 'react-i18next'

function CustomHead() {
  const [t] = useTranslation()

  return (
    <Head>
      <title>{t('Header.siteTitle')}</title>
      <meta content={t('Header.description') as string} name='description' />
      <meta content='light' name='color-scheme' />
      <meta
        content='upgrade-insecure-requests'
        httpEquiv='Content-Security-Policy'
      />
      <link href='/geek_ai.ico' rel='icon' />
    </Head>
  )
}

export default CustomHead
