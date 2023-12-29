import Header from '~/components/Layout/Header'
import CodeTest from '~/components/pages/code'
import { PageType } from '~/types/pages/page'

function code() {
  return (
    <>
      <Header title={PageType.User.Code.name} />
      <CodeTest />
    </>
  )
}

export default code
