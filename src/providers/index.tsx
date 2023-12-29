import React, { ComponentProps, ComponentType, FC, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '~/helpers/locales/i18n'
import AdminProvider from './AdminProvider'
import AlertProvider from './AlertProvider'
import QuestionProvider from './QuestionProvider'
import ReportProvider from './ReportProvider'
import SessionUserProvider from './SessionUserProvider'

type Providers = [ComponentType<any>, ComponentProps<any>?][]

const combineProviders = (providers: Providers): FC<{ children: ReactNode }> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) => {
      const ProviderWrapper: FC<{ children: ReactNode }> = ({ children }) => (
        <AccumulatedProviders>
          <Provider {...props}>{children}</Provider>
        </AccumulatedProviders>
      )
      return ProviderWrapper
    },
    ({ children }) => <>{children}</>
  )

export const AllProviders = combineProviders([
  [AlertProvider, {}],
  [AdminProvider, {}],
  [QuestionProvider, {}],
  [ReportProvider, {}],
  [SessionUserProvider, {}],
  [I18nextProvider, { i18n: i18n }],
])
