import Layout from '~/components/pages/register/Layout'
import { useProps } from '~/components/pages/register/useProps'

function Register() {
  return <Layout {...useProps()} />
}
export default Register
