import Header from '~/components/layout/header'
import UserManage from '~/components/pages/admin/user'
import { PageType } from '~/types/page'

const admin = () => {
  return (
    <>
      <Header title={PageType.Admin.User.name} />
      <UserManage />
    </>
  )
}

export default admin
