import Header from '~/components/Layout/Header'
import Top from '~/components/pages/top'
import { PageType } from '~/types/pages/page'

export default function Home() {
  return (
    <>
      <Header title={PageType.Standard.Top.name} />
      <Top />
    </>
  )
}
