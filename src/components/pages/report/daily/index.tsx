import Layout from './Layout'
import { useProps } from './useProps'

function Daily() {
  return <Layout {...useProps()} />
}

export default Daily
