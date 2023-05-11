import Header from '~/components/layout/header'
import CodeTest from '~/components/pages/code'
import { PageType } from '~/types/page'

function code() {
  return (
    <>
      <Header title={PageType.User.Code.name} />
      <CodeTest />
    </>
  )
}

export default code
