import { ReactNode } from 'react'
import { useTabs } from './TabProvider'

type Props = {
  children: ReactNode
  index: number
}

function TabPanel({ index, children }: Props) {
  const { context: value } = useTabs()
  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      className='my-4 w-[60vw]'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role='tabpanel'
    >
      {children}
    </div>
  )
}

export default TabPanel
