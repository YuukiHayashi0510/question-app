import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import CustomHead from '~/components/layout/CustomHead'
import Footer from '~/components/layout/footer'
import AdminProvider from '~/components/provider/AdminProvider'
import QuestionProvider from '~/components/provider/QuestionProvider'
import ReportProvider from '~/components/provider/ReportProvider'
import SessionUserProvider from '~/components/provider/SessionUserProvider'
import i18n from '~/lib/locales/i18n'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  return (
    <I18nextProvider i18n={i18n}>
      <QuestionProvider>
        <SessionUserProvider>
          <ReportProvider>
            <AdminProvider>
              <CustomHead />
              <div className='flex min-h-screen flex-col items-center'>
                {props.children}
              </div>
              <Footer />
            </AdminProvider>
          </ReportProvider>
        </SessionUserProvider>
      </QuestionProvider>
    </I18nextProvider>
  )
}

export default Layout
