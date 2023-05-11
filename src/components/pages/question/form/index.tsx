import Layout from '~/components/pages/question/form/Layout'
import { useProps } from '~/components/pages/question/form/useProps'

export function Form() {
  return <Layout {...useProps()} />
}
