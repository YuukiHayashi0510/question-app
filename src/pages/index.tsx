import Header from '~/components/layout/header'
import Top from '~/components/pages/top'
import { PageType } from '~/types/page'

export default function Home() {
  return (
    <>
      <Header title={PageType.Standard.Top.name} />
      <Top />
    </>
  )
}
