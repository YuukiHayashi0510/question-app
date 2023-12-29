import Header from '~/components/Layout/Header'
import Overview from '~/components/pages/report/overview'
import { PageType } from '~/types/pages/page'

function index() {
  return (
    <>
      <Header title={PageType.Mentor.Overview.name} />
      <Overview />
    </>
  )
}

export default index
