import Layout from '~/components/pages/admin/user/Layout'
import { useProps } from '~/components/pages/admin/user/useProps'

function UserManage() {
  return <Layout {...useProps()} />
}

export default UserManage
