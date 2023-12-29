import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { PageType } from '~/types/pages/page'
import Layout from '.'

type Props = {
  children: ReactNode
}

function RegisterGuard({ children }: Props) {
  const { context: sessionUser } = useSessionUser()
  const isValid = !sessionUser['role']
  const [t] = useTranslation()

  return (
    <Layout
      alertMessage={t('Alert.Login.alreadyUser')}
      isValid={isValid}
      url={PageType.Standard.Question.url}
    >
      {children}
    </Layout>
  )
}

export default RegisterGuard
