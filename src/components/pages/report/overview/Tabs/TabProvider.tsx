import { createContext, ReactNode, useContext, useState } from 'react'
import { TabContext as Context } from '~/types/app'

type Props = {
  children: ReactNode
}

const TabContext = createContext<Context>({} as any)

function TabProvider(props: Props) {
  const [context, setContext] = useState<Context['context']>(0)

  return (
    <TabContext.Provider value={{ context, setContext }}>
      {props.children}
    </TabContext.Provider>
  )
}

export default TabProvider

export const useTabs = () => useContext(TabContext)
