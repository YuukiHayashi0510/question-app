import { createContext, ReactNode, useContext, useState } from 'react'
import { AdminContext as Context } from '~/types/app'

type Props = {
  children: ReactNode
}

const AdminContext = createContext<Context>({} as any)

function AdminProvider(props: Props) {
  const [context, setContext] = useState<Context['context']>({
    user: [],
    report: [],
  })

  return (
    <AdminContext.Provider value={{ context, setContext }}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminProvider

export const useAdmin = () => useContext(AdminContext)
