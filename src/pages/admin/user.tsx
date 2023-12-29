import Header from '~/components/Layout/Header'
import UserManage from '~/components/pages/admin/user'
import { PageType } from '~/types/pages/page'

const admin = () => {
  return (
    <>
      <Header title={PageType.Admin.User.name} />
      <UserManage />
    </>
  )
}

export default admin
