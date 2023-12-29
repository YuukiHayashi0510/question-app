import { createContext, ReactNode, useContext, useState } from 'react'
import { SessionUserContext as Context } from '~/types/app'

type Props = {
  children: ReactNode
}

const SessionUserContext = createContext<Context>({} as any)

function SessionUserProvider(props: Props) {
  const [context, setContext] = useState<Context['context']>({
    id: '',
    name: '',
  })

  return (
    <SessionUserContext.Provider value={{ context, setContext }}>
      {props.children}
    </SessionUserContext.Provider>
  )
}

export default SessionUserProvider

export const useSessionUser = () => useContext(SessionUserContext)
