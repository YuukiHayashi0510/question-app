import '~/styles/globals.css'
import Layout from '~/components/Layout'

import { AllProviders } from '~/providers'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AllProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AllProviders>
  )
}
