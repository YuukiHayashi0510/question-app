import Layout from '~/components/pages/question/index/Layout'
import { useProps } from '~/components/pages/question/index/useProps'

function Question() {
  return <Layout {...useProps()} />
}

export default Question
