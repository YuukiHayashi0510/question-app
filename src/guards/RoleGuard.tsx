import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { PageType } from '~/types/pages/page'
import { Role } from '~/types/pages/user/const'
import { useSessionUser } from '../providers/SessionUserProvider'
import Layout from '.'

type Props = {
  role: Role
  children: ReactNode
}

function RoleGuard({ role, children }: Props) {
  const { context: sessionUser } = useSessionUser()
  const isValid = sessionUser['role'] === role
  const [t] = useTranslation()

  return (
    <Layout
      alertMessage={t('Alert.inValidUser')}
      isValid={isValid}
      url={PageType.Standard.Top.url}
    >
      {children}
    </Layout>
  )
}

export default RoleGuard
