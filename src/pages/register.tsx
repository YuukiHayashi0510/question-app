import Header from '~/components/Layout/Header'
import Register from '~/components/pages/register'
import { PageType } from '~/types/pages/page'

function register() {
  return (
    <>
      <Header title={PageType.Standard.Register.name} />
      <Register />
    </>
  )
}

export default register
