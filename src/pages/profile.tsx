import Header from '~/components/layout/header'
import Profile from '~/components/pages/profile'
import { PageType } from '~/types/page'

function profile() {
  return (
    <>
      <Header title={PageType.User.Profile.name} />
      <Profile />
    </>
  )
}

export default profile
