import Layout from './Layout'
import TabProvider from './Tabs/TabProvider'
import { useProps } from './useProps'

function Overview() {
  return (
    <TabProvider>
      <Layout {...useProps()} />
    </TabProvider>
  )
}

export default Overview
