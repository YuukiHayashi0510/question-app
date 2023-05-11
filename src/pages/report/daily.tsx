import Header from '~/components/layout/header'
import Daily from '~/components/pages/report/daily'
import { PageType } from '~/types/page'

function dayly() {
  return (
    <>
      <Header title={PageType.Mentor.Daily.name} />
      <Daily />
    </>
  )
}

export default dayly
