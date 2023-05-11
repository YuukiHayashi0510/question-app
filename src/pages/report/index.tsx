import Header from '~/components/layout/header'
import Overview from '~/components/pages/report/overview'
import { PageType } from '~/types/page'

function index() {
  return (
    <>
      <Header title={PageType.Mentor.Overview.name} />
      <Overview />
    </>
  )
}

export default index
