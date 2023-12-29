import { createContext, ReactNode, useContext, useState } from 'react'
import { ReportContext as Context } from '~/types/app'

type Props = {
  children: ReactNode
}

const ReportContext = createContext<Context>({} as any)

function ReportProvider(props: Props) {
  const [context, setContext] = useState<Context['context']>([])

  return (
    <ReportContext.Provider value={{ context, setContext }}>
      {props.children}
    </ReportContext.Provider>
  )
}

export default ReportProvider

export const useReport = () => useContext(ReportContext)
