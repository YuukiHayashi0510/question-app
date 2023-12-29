import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          content='GeekSalon AIコースのアプリです。質問の受付からコードテスト(実装予定)を行うことができます。'
          name='description'
        />
        <meta content='light' name='color-scheme' />
        <meta
          content='upgrade-insecure-requests'
          httpEquiv='Content-Security-Policy'
        />
        <link href='/geek_ai.ico' rel='icon' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
