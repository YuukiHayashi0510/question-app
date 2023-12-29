import Header from '~/components/Layout/Header'
import Daily from '~/components/pages/report/daily'
import { PageType } from '~/types/pages/page'

function daily() {
  return (
    <>
      <Header title={PageType.Mentor.Daily.name} />
      <Daily />
    </>
  )
}

export default daily
