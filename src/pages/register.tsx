import Header from '~/components/layout/header'
import Register from '~/components/pages/register'
import { PageType } from '~/types/page'

function register() {
  return (
    <>
      <Header title={PageType.Standard.Register.name} />
      <Register />
    </>
  )
}

export default register
