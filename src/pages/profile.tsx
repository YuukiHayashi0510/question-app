import Header from '~/components/Layout/Header'
import Profile from '~/components/pages/profile'
import { PageType } from '~/types/pages/page'

function profile() {
  return (
    <>
      <Header title={PageType.User.Profile.name} />
      <Profile />
    </>
  )
}

export default profile
